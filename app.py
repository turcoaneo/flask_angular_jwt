import logging
import os

from flask import Flask, render_template
from flask_jwt_extended import JWTManager

from resources.api.user_routes import blp
from resources.utils.app_config import set_config_jwt, set_config_db, set_config_env
from resources.utils.db_create import db
from resources.utils.swagger_config import set_config_swagger, create_swagger_ui, SWAGGER_URL

app = Flask(__name__, template_folder='templates', static_folder='static')
app.logger.setLevel(logging.INFO)

config = app.config
# JWT Initialization
set_config_jwt(config)
jwt = JWTManager(app)

env = os.getenv('ENVIRONMENT')
if env == 'dev':
    from flask_cors import CORS
    CORS(app)

set_config_env(config, env)
set_config_db(config)

set_config_swagger(config)
authorizations = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'authorization'
    }
}

db.init_app(app)


app.register_blueprint(blp)
if env != 'prod':
    app.register_blueprint(create_swagger_ui(), url_prefix=SWAGGER_URL)


@app.get("/hello")
def hello():
    data = {"message": "Hello, Swagger World!"}
    return data


@app.route("/")
def index():
    return render_template('index.html')
