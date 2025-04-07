import logging
import os

from flask import Flask, render_template
from flask_jwt_extended import JWTManager

from resources.api.user_routes import blp
from resources.utils.db_utils import db

app = Flask(__name__, template_folder='templates', static_folder='static')
app.logger.setLevel(logging.INFO)

app.config["JWT_SECRET_KEY"] = 'my_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
# JWT Initialization
jwt = JWTManager(app)

database_port = os.getenv('DATABASE_PORT', '3306')
# database_url = os.getenv('DATABASE_URL', 'cluster-db-aurora-instance-1.cn48a44e27uj.eu-north-1.rds.amazonaws.com')
database_url = os.getenv('DATABASE_URL', 'mysql-community-db.cn48a44e27uj.eu-north-1.rds.amazonaws.com')
db_name = os.getenv('DATABASE_NAME', 'dev_db')
pw = os.getenv('DATABASE_PW', 'Sky_Auro#*75')
user = os.getenv('DATABASE_USER', 'admin')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://%s:%s@%s:%s/%s' % (user, pw, database_url, database_port, db_name)
db.init_app(app)
# with app.app_context():
#     db.create_all()

app.register_blueprint(blp)


# app.register_blueprint(flask_blp)


@app.route("/")
def index():
    return render_template('index.html')
