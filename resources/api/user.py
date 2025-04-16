from flask import current_app as f_app, make_response
from flask import jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint
from sqlalchemy.exc import IntegrityError

from resources.dto.user_dto import UserDTO
from resources.models.user import User
from resources.utils.db_create import db

blp = Blueprint('user', __name__, url_prefix='/user', description="Operation with users")


@blp.route('/')
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


@blp.route('/id/<int:user_id>')
class UserById(MethodView):
    @blp.response(200, UserDTO)
    @jwt_required()
    def get(self, user_id):
        db_result = get_user_by_id(user_id)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/alias/<string:alias>')
class UserByAlias(MethodView):
    @blp.response(200, UserDTO)
    @jwt_required()
    def get(self, alias):
        db_result = get_user_by_alias(alias)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/alias/many/<string:alias>')
class UserListByName(MethodView):
    @blp.response(200, UserDTO(many=True))
    @jwt_required()
    def get(self, alias):
        db_result = User.query.filter_by(alias=alias)
        result = [r.as_dict() for r in db_result]
        return jsonify(result)


def get_user_by_alias(user_alias):
    return User.query.filter_by(alias=user_alias).first()


def get_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()
