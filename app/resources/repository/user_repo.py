from datetime import datetime

from sqlalchemy.exc import IntegrityError

from app.resources.models.user import User
from app.resources.utils.db_create import db

from flask import current_app as app
app_logger = app.logger


class UserRepo:

    def __init__(self, repo_db=db):
        self.db = repo_db

    def get_all_users(self) -> list[User]:
        app_logger.debug(f'Getting all from [db = {self.db.engine.name}]')
        return self.db.session.query(User).all()

    def save_user(self, user) -> bool | str:
        try:
            self.db.session.add(user)
            self.db.session.commit()
        except IntegrityError as ex:
            app_logger.error(f'IntegrityError: {ex}')
            return repr(ex)
        return True

    def get_users_by_alias(self, user_alias) -> list[User]:
        app_logger.debug(f'Getting user by [alias = {user_alias}] from [db = {self.db.engine.name}]')
        return User.query.filter_by(alias=user_alias)

    def get_user_by_email(self, email):
        app_logger.debug(f'Getting user by [email = {email}] from [db = {self.db.engine.name}]')
        return User.query.filter(User.email == email).first()

    def get_user_by_alias(self, user_alias):
        app_logger.debug(f'Getting user by [alias = {user_alias}] from [db = {self.db.engine.name}]')
        return User.query.filter_by(alias=user_alias).first()

    def get_user_by_id(self, user_id):
        app_logger.debug(f'Getting user by [id = {user_id}] from [db = {self.db.engine.name}]')
        return User.query.filter_by(id=user_id).first()

    def modify_user_attr(self, user: User, attr_name: str, value: datetime) -> bool:
        try:
            setattr(user, attr_name, value)
            self.db.session.commit()
            return True
        except Exception as ex:
            app_logger.error(f'Error while modifying [user = {user.email}] - [attr name = {attr_name}]: {ex}')
            return False
