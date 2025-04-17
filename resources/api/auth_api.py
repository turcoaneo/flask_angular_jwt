from flask import request
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint
from resources.api.utils.helper_api import extract_email_from_request_header

from resources.dto.user_dto import UserLoginDTO
from resources.service.auth_service import AuthService

blp_auth = Blueprint('auth', __name__, url_prefix='/auth', description="Authentication")


@blp_auth.route('/login')
class UserLogin(MethodView):
    authService: AuthService = AuthService()
    @blp_auth.arguments(UserLoginDTO)
    @blp_auth.response(200)
    def post(self, user_dto):
        return self.authService.login(user_dto)


@blp_auth.route('/token')
class UserToken(MethodView):
    auth_service: AuthService = AuthService()
    @blp_auth.response(205)
    @jwt_required()
    def get(self):
        email = extract_email_from_request_header(request)
        return self.auth_service.refresh_jwt(email)
