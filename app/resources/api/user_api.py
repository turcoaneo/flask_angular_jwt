import os

from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint

from app.resources.dto.user_dto import UserDTO
from app.resources.service.user_service import UserService

blp_user = Blueprint('user', __name__, url_prefix='/user', description="Operation with users")


@blp_user.route('/')
class UserCRUD(MethodView):
    user_service: UserService = UserService()
    is_optional_for_test = os.getenv('ENVIRONMENT') == 'test'

    @blp_user.response(200, UserDTO(many=True))
    @jwt_required(is_optional_for_test)
    def get(self):
        return self.user_service.get_all_users()

    @blp_user.arguments(UserDTO)
    @blp_user.response(201)
    def post(self, user_dto):
        result = self.user_service.create_user(user_dto)
        if isinstance(result, str):
            return result
        return self.user_service.get_users_by_alias(user_dto['alias'])


@blp_user.route('/id/<int:user_id>')
class UserById(MethodView):
    user_service: UserService = UserService()

    @blp_user.response(200, UserDTO)
    @jwt_required()
    def get(self, user_id):
        return self.user_service.get_user_by_id(user_id)


@blp_user.route('/alias/<string:alias>')
class UserByAlias(MethodView):
    user_service: UserService = UserService()

    @blp_user.response(200, UserDTO)
    @jwt_required()
    def get(self, alias):
        return self.user_service.get_user_by_alias(alias)


@blp_user.route('/alias/many/<string:alias>')
class UserListByName(MethodView):
    user_service: UserService = UserService()

    @blp_user.response(200, UserDTO(many=True))
    @jwt_required()
    def get(self, alias):
        return self.user_service.get_users_by_alias(alias)
