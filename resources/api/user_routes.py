import os
from datetime import timedelta

from flask import current_app as f_app, make_response, request
from flask import jsonify
from flask.views import MethodView
from flask_jwt_extended import create_access_token, jwt_required, decode_token
from flask_smorest import Blueprint
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError

from resources.dto.user_dto import UserDTO, UserMiniDTO
from resources.models.user import User
from resources.utils.db_utils import db

blp = Blueprint('User', "users", description="Operation with users")




@blp.route('/login')
class UserLogin(MethodView):
    @blp.arguments(UserMiniDTO)
    @blp.response(200)
    def post(self, user_dto):
        username = user_dto['email']
        password = user_dto['password']

        user = User.query.filter(User.email == username).first()

        if user:
            if user.authenticate(password):
                user_alias = user.alias
                f_app.logger.info(f'Authenticated: {user_alias}')

                user.updated = func.utc_timestamp()
                db.session.commit()
                json_result = make_response_jwt_token(username)
                return json_result

        password_display = password[:2] + '...' + password[-2:]
        f_app.logger.error(f"Not authenticated for user {username} and pass {password_display}")
        return make_response({'error': '401 Unauthorized'}, 401)


@blp.route('/token')
class UserToken(MethodView):
    @blp.response(200)
    @jwt_required()
    def get(self):
        token = request.headers['Authorization'].split(None, 1)[1].strip()
        token_payload = decode_token(token)
        email = token_payload['sub']
        user = User.query.filter(User.email == email).first()

        if user:
            f_app.logger.info(f'Refreshing token for: {email}')

            user.updated = func.utc_timestamp()
            db.session.commit()
            json_result = make_response_jwt_token(email)
            return json_result

        f_app.logger.error(f"Not refreshed for user {email}")
        return make_response({'error': '401 Unauthorized'}, 401)


@blp.route('/user/name/<string:user_name>')
class UserByName(MethodView):
    @blp.response(200, UserDTO)
    @jwt_required()
    def get(self, user_name):
        db_result = get_user_by_alias(user_name)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user')
class UserCRUD(MethodView):
    @blp.response(200, UserDTO(many=True))
    @jwt_required()
    def get(self):
        db_result = db.session.query(User).all()
        result = [r.as_dict() for r in db_result]
        return jsonify(result)

    @blp.arguments(UserDTO)
    @blp.response(201, UserDTO)
    def post(self, user_dto):
        user_name = user_dto['email']
        user_alias = user_dto['alias']
        user_pass = user_dto['password']
        user = User(user_name, user_alias)
        user.password_hash = user_pass
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError as ex:
            f_app.logger.error(f'IntegrityError: {ex}')
            return make_response({"error": str(ex)}, 422)
        db_result = get_user_by_alias(user_alias)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/id/<int:user_id>')
class UserById(MethodView):
    @blp.response(200, UserDTO)
    def get(self, user_id):
        db_result = get_user_by_id(user_id)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/name/many/<string:user_name>')
class UserListByName(MethodView):
    @blp.response(200, UserDTO(many=True))
    def get(self, user_name):
        db_result = User.query.filter_by(alias=user_name)
        result = [r.as_dict() for r in db_result]
        return jsonify(result)


def make_response_jwt_token(email):
    exp_minutes = os.getenv('JWT_EXPIRATION_MINUTES')
    exp_time = timedelta(minutes=int(exp_minutes))
    access_token = create_access_token(identity=email, expires_delta=exp_time)
    f_app.logger.debug(access_token)
    json_result = make_response(
        {'message': 'login successful', 'expires_minutes': exp_minutes, 'token': access_token}, 202)
    return json_result


def get_user_by_alias(user_alias):
    return User.query.filter_by(alias=user_alias).first()


def get_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()
