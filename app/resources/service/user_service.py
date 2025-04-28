from flask import jsonify, make_response, Response

from app.resources.models.user import User
from app.resources.repository.user_repo import UserRepo


class UserService:
    user_repo: UserRepo

    def __init__(self, user_repo: UserRepo = UserRepo()):
        self.user_repo = user_repo

    def get_all_users(self) -> Response:
        result = []
        db_result = self.user_repo.get_all_users()
        if db_result is not None:
            result = UserService.convert_db_list_to_dict(db_result)
        return jsonify(result)

    def create_user(self, user_dto: dict) -> bool | Response:
        user_name = user_dto['email']
        user_alias = user_dto['alias']
        user_pass = user_dto['password']
        user = User(user_name, user_alias)
        user.password_hash = user_pass
        db_result = self.user_repo.save_user(user)
        if isinstance(db_result, str):
            return make_response({"error": db_result}, 422)
        return jsonify(db_result)

    def get_users_by_alias(self, user_alias) -> Response:
        result = []
        db_result = self.user_repo.get_users_by_alias(user_alias)
        if db_result is not None:
            result = UserService.convert_db_list_to_dict(db_result)
        return jsonify(result)

    def get_user_by_alias(self, user_alias) -> Response:
        db_result = self.user_repo.get_user_by_alias(user_alias)
        if db_result is None:
            return make_response({"response": db_result}, 404)
        return jsonify(db_result.as_dict())

    def get_user_by_id(self, user_id) -> Response:
        db_result = self.user_repo.get_user_by_id(user_id)
        if db_result is None:
            return make_response({"response": db_result}, 404)
        return jsonify(db_result.as_dict())

    @staticmethod
    def convert_db_list_to_dict(db_result) -> list:
        result = [r.as_dict() for r in db_result]
        return result
