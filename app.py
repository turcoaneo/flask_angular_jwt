import logging
import os

from flask import Flask, render_template
from flask_jwt_extended import JWTManager

from resources.utils.app_config import set_config_jwt, set_config_db, set_config_env
from resources.utils.blueprint_iterator import identify_blueprints_dynamically
from resources.utils.db_create import db
from resources.utils.swagger_config import set_config_swagger, create_swagger_ui, SWAGGER_URL


def register_blueprints(blueprints_module='resources.api'):
    for blp in identify_blueprints_dynamically(blueprints_module):
        app.register_blueprint(blp)


app = Flask(__name__, template_folder='templates', static_folder='static')
app_logger: logging.Logger = app.logger
app_logger.setLevel(logging.INFO)

config = app.config

set_config_jwt(config)
jwt = JWTManager(app)

env = os.getenv('ENVIRONMENT')
if env == 'dev':
    app_logger.setLevel(logging.DEBUG)
    from flask_cors import CORS

    CORS(app)

set_config_env(config, env)

set_config_db(config)
db.init_app(app)

register_blueprints('resources.api')

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
