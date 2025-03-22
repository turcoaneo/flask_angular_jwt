from dataclasses import dataclass

from ..utils.db_utils import db


@dataclass
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
