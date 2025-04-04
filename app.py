import logging

from flask import Flask, render_template
from flask_jwt_extended import JWTManager

from resources.api.user_routes import blp
from resources.utils.db_utils import db

app = Flask(__name__, template_folder='templates', static_folder='static')
app.logger.setLevel(logging.INFO)

app.config["JWT_SECRET_KEY"] = 'your_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
# JWT Initialization
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:my-secret-pw@127.0.0.1:3307/mydb'
db.init_app(app)
with app.app_context():
    db.create_all()

app.register_blueprint(blp)
# app.register_blueprint(flask_blp)


@app.route("/")
def index():
    return render_template('index.html')
