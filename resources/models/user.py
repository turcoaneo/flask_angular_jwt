from datetime import datetime

import bcrypt
from sqlalchemy import func, String
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from resources.utils.db_utils import db


utf_encoding = 'utf-8'


class User(db.Model):
    __tablename__ = "user_account"

    id: Mapped[int] = mapped_column(primary_key=True)
    alias: Mapped[str] = mapped_column(String(30), unique=True)
    email: Mapped[str] = mapped_column(String(50), unique=True)

    created: Mapped[datetime] = mapped_column(insert_default=func.utc_timestamp())
    updated: Mapped[datetime] = mapped_column(nullable=False)
    expire: Mapped[datetime] = mapped_column(nullable=True)

    password: Mapped[str] = mapped_column(String(100), nullable=False)

    def __init__(self, email, alias):
        self.email = email
        self.alias = alias
        self.updated = func.utc_timestamp()

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed!')

    @password_hash.setter
    def password_hash(self, password_text):
        byte_password = password_text.encode('utf-8')
        # Generate salt
        my_salt = bcrypt.gensalt(12)
        # Hash password
        password_hash = bcrypt.hashpw(byte_password, my_salt)
        if not bcrypt.checkpw(password_text.encode(utf_encoding), password_hash):
            raise AttributeError('Hashing not working for password!')
        # noinspection PyTypeChecker
        self.password = password_hash.decode(utf_encoding)

    def authenticate(self, password):
        return bcrypt.checkpw(password.encode(utf_encoding), self.password.encode(utf_encoding))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
