import logging
import os

from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from .resources.utils.app_config import set_config_jwt, set_config_db, set_config_env
from .resources.utils.blueprint_iterator import identify_api_blueprints_dynamically
from .resources.utils.db_create import db
from .resources.utils.swagger_config import set_config_swagger, create_swagger_ui, SWAGGER_URL


def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')
    app_logger: logging.Logger = app.logger
    app_logger.setLevel(logging.INFO)

    config = app.config

    set_config_jwt(config)
    JWTManager(app)

    env = os.getenv('ENVIRONMENT')
    if env == 'dev' or env == 'test':
        app_logger.setLevel(logging.DEBUG)
        from flask_cors import CORS

        CORS(app)

    set_config_env(config, env)

    set_config_db(config, env)

    db.init_app(app)
    Migrate(app, db)

    if env != 'prod':
        set_config_swagger(config)
        app.register_blueprint(create_swagger_ui(), url_prefix=SWAGGER_URL)

        @app.get("/hello")
        def hello():
            data = {"message": "Hello, Swagger World!"}
            return data

        @app.route("/")
        def index():
            return render_template('index.html')

    return app


def register_api_blueprints(app):
    with app.app_context():
        for blp in identify_api_blueprints_dynamically():
            app.register_blueprint(blp)
