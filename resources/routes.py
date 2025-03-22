from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint

from .dto.user_dto import UserDTO
from .models.user import User
from .utils.db_utils import db

blp = Blueprint('User', "users", description="Operation with users")


@blp.route('/user/id/<int:user_id>')
class UserByName(MethodView):
    @blp.response(200, UserDTO)
    def get(self, user_id):
        db_result = get_user_by_id(user_id)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/name/<string:user_name>')
class UserByName(MethodView):
    @blp.response(200, UserDTO)
    def get(self, user_name):
        db_result = get_user_by_name(user_name)
        json_result = db_result.as_dict()
        return json_result


@blp.route('/user/name/many/<string:user_name>')
class UserListByName(MethodView):
    @blp.response(200, UserDTO(many=True))
    def get(self, user_name):
        db_result = User.query.filter_by(name=user_name)
        result = [r.as_dict() for r in db_result]
        return jsonify(result)


@blp.route('/user')
class UserCRUD(MethodView):
    @blp.response(200, UserDTO(many=True))
    def get(self):
        db_result = db.session.query(User).all()
        result = [r.as_dict() for r in db_result]
        return jsonify(result)

    @blp.arguments(UserDTO)
    @blp.response(201, UserDTO)
    def post(self, user_dto):
        user = User()
        user_name = user_dto['name']
        user.name = user_name
        db.session.add(user)
        db.session.commit()
        db_result = get_user_by_name(user_name)
        json_result = db_result.as_dict()
        return json_result


def get_user_by_name(user_name):
    return User.query.filter_by(name=user_name).first()


def get_user_by_id(user_id):
    return User.query.filter_by(id=user_id).first()
