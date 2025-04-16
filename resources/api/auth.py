from datetime import timedelta

from flask import current_app as f_app, make_response, request
from flask.views import MethodView
from flask_jwt_extended import create_access_token, jwt_required, decode_token
from flask_smorest import Blueprint
from sqlalchemy import func

from resources.dto.user_dto import UserLoginDTO
from resources.models.user import User
from resources.utils.app_config import JWT_EXPIRATION_MINUTES
from resources.utils.db_create import db
from resources.utils.swagger_config import SWAGGER_URL, SWAGGER_JWT_EXPIRATION_MINUTES

blp_auth = Blueprint('auth', __name__, url_prefix='/auth', description="Authentication")


@blp_auth.route('/login')
class UserLogin(MethodView):
    @blp_auth.arguments(UserLoginDTO)
    @blp_auth.response(200)
    def post(self, user_dto):
        username = user_dto['email']
        password = user_dto['password']
        isSwaggerRequest = SWAGGER_URL in request.referrer
        token_exp = SWAGGER_JWT_EXPIRATION_MINUTES if isSwaggerRequest else JWT_EXPIRATION_MINUTES

        user = User.query.filter(User.email == username).first()

        if user:
            if user.authenticate(password):
                user_alias = user.alias
                f_app.logger.info(f'Authenticated: {user_alias}')

                user.updated = func.utc_timestamp()
                db.session.commit()
                json_result = make_response_jwt_token(username, token_exp)
                return json_result

        password_display = password[:2] + '...' + password[-2:]
        f_app.logger.error(f"Not authenticated for user {username} and pass {password_display}")
        return make_response({'error': '401 Unauthorized'}, 401)


@blp_auth.route('/token')
class UserToken(MethodView):
    @blp_auth.response(205)
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
            json_result = make_response_jwt_token(email, JWT_EXPIRATION_MINUTES)
            return json_result

        f_app.logger.error(f"Not refreshed for user {email}")
        return make_response({'error': '401 Unauthorized'}, 401)


def make_response_jwt_token(email, exp):
    exp_time = timedelta(minutes=int(exp))
    access_token = create_access_token(identity=email, expires_delta=exp_time)
    f_app.logger.debug(access_token)
    json_result = make_response(
        {'message': 'login successful', 'expires_minutes': exp, 'token': access_token}, 201)
    return json_result
