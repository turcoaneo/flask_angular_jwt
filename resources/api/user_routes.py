import logging

from flask import current_app as f_app, make_response
from flask import jsonify
from flask.views import MethodView
from flask_jwt_extended import create_access_token, jwt_required
from flask_smorest import Blueprint
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError

from resources.dto.user_dto import UserDTO, UserMiniDTO
from resources.models.user import User
from resources.utils.db_utils import db

blp = Blueprint('User', "users", description="Operation with users")


def set_log_level(level: logging):
    f_app.logger.setLevel(level)


@blp.route('/login')
class UserLogin(MethodView):
    @blp.arguments(UserMiniDTO)
    @blp.response(200, UserDTO)
    def post(self, user_dto):
        username = user_dto['email']
        password = user_dto['password']

        user = User.query.filter(User.email == username).first()
        set_log_level(logging.DEBUG)

        if user:
            if user.authenticate(password):
                user_alias = user.alias
                f_app.logger.debug(f'Authenticated: {user_alias}')
                set_log_level(logging.INFO)

                user.updated = func.utc_timestamp()
                db.session.commit()
                access_token = create_access_token(identity=user.email)
                json_result = make_response({'message': 'Login successful', 'token': access_token})
                return json_result

        set_log_level(logging.INFO)
        f_app.logger.error(f"Not authenticated for user {username} and pass {password}")
        return make_response({'error': '401 Unauthorized'}, 401)


@blp.route('/user/id/<int:user_id>')
class UserById(MethodView):
    @blp.response(200, UserDTO)
    def get(self, user_id):
        db_result = get_user_by_id(user_id)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/name/<string:user_name>')
class UserByName(MethodView):
    @blp.response(200, UserDTO)
    @jwt_required()
    def get(self, user_name):
        db_result = get_user_by_alias(user_name)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/name/many/<string:user_name>')
class UserListByName(MethodView):
    @blp.response(200, UserDTO(many=True))
    def get(self, user_name):
        db_result = User.query.filter_by(alias=user_name)
        result = [r.as_dict() for r in db_result]
        return jsonify(result)


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


def get_user_by_alias(user_alias):
    return User.query.filter_by(alias=user_alias).first()


def get_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()
