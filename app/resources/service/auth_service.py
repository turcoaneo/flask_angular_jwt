from datetime import timedelta

from flask import make_response, request, Response
from flask_jwt_extended import create_access_token
from sqlalchemy import func

from flask import current_app as app
from app.resources.repository.user_repo import UserRepo
from app.resources.utils.app_config import JWT_EXPIRATION_MINUTES
from app.resources.utils.swagger_config import SWAGGER_URL, SWAGGER_JWT_EXPIRATION_MINUTES

app_logger = app.logger
# SWAGGER_JWT_EXPIRATION_MINUTES = 60 * 24
# SWAGGER_URL = '/swagger-ui'
# JWT_EXPIRATION_MINUTES = os.getenv('JWT_EXPIRATION_MINUTES')


class AuthService:
    user_repo: UserRepo = UserRepo()

    def login(self, user_dto: dict):
        email = user_dto['email']
        password = user_dto['password']
        is_swagger_request = SWAGGER_URL in request.referrer
        token_exp = SWAGGER_JWT_EXPIRATION_MINUTES if is_swagger_request else JWT_EXPIRATION_MINUTES

        user = self.user_repo.get_user_by_email(email)

        if user:
            if user.authenticate(password):
                user_alias = user.alias
                app_logger.info(f'Authenticated: {user_alias}')
                json_result = AuthService.make_response_jwt_token(email, token_exp)
                timestamp = func.utc_timestamp()
                is_updated = self.user_repo.modify_user_attr(user, 'updated', timestamp)
                if is_updated:
                    app_logger.debug(f"Modified [user = {user.email}] - [updated = {timestamp}]")
                else:
                    app_logger.debug(f"Could not modify [user = {user.email}] - [updated = {timestamp}]")
                return json_result

        password_display = password[:2] + '...' + password[-2:]
        app_logger.error(f"Not authenticated for [user = {email}] and [pass = {password_display}]")
        return make_response({'error': '401 Unauthorized'}, 401)

    def refresh_jwt(self, email: str) -> Response:
        user = self.user_repo.get_user_by_email(email)
        if user:
            app_logger.info(f'Refreshing token for: {email}')
            json_result = AuthService.make_response_jwt_token(email, JWT_EXPIRATION_MINUTES)
            self.user_repo.modify_user_attr(user, 'updated', func.utc_timestamp())
            return json_result

        app_logger.error(f"Not refreshed for [user = {email}]")
        return make_response({'error': '401 Unauthorized'}, 401)

    @staticmethod
    def make_response_jwt_token(email, exp):
        exp_time = timedelta(minutes=int(exp))
        access_token = create_access_token(identity=email, expires_delta=exp_time)
        app_logger.debug(access_token)
        json_result = make_response(
            {'message': 'login successful', 'expires_minutes': exp, 'token': access_token}, 201)
        return json_result
