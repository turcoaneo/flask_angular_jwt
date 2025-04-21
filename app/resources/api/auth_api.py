from flask import Request
from flask import request
from flask.views import MethodView
from flask_jwt_extended import decode_token
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint

from app.resources.dto.user_dto import UserLoginDTO
from app.resources.service.auth_service import AuthService

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


def extract_email_from_request_header(user_request: Request) -> str:
    token = user_request.headers['Authorization'].split(None, 1)[1].strip()
    token_payload = decode_token(token)
    return token_payload['sub']
