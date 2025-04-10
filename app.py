import logging
import os

from flask import Flask, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from resources.api.user_routes import blp
from resources.utils.db_utils import db

app = Flask(__name__, template_folder='templates', static_folder='static')
app.logger.setLevel(logging.INFO)

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['headers']
# JWT Initialization
jwt = JWTManager(app)

env = os.getenv('ENVIRONMENT')
if env == 'dev':
    CORS(app)

config_dir = './resources/config/'
if env is not None:
    if env == 'dev':
        app.config.from_pyfile(f'{config_dir}dev_settings.py')
    elif env == 'uat':
        app.config.from_pyfile(f'{config_dir}uat_settings.py')
    elif env == 'prod':
        app.config.from_pyfile(f'{config_dir}prod_settings.py')
    else:
        raise RuntimeError('Unknown environment setting provided.')
else:
    app.config.from_pyfile(f'{config_dir}prod_settings.py')

db_port = app.config['DATABASE_PORT']
db_url = app.config['DATABASE_URL']
db_name = app.config['DATABASE_NAME']
db_user = app.config['DATABASE_USER']

pw = os.getenv('DATABASE_PW')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{db_user}:{pw}@{db_url}:{db_port}/{db_name}'
db.init_app(app)


app.register_blueprint(blp)
# app.register_blueprint(flask_blp)


@app.route("/")
def index():
    return render_template('index.html')
