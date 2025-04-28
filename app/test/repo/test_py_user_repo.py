import pytest

from app.resources.models.user import User
from app.resources.repository.user_repo import UserRepo
from app.test.test_unit_user_api import TestWebApp
from ..helper_test import app, init_db


@pytest.mark.usefixtures('init_db')
def test__when_use_sqlite__then_verify_exception():
    user = TestWebApp.createUser()
    userRepo = UserRepo()
    result = None
    try:
        result = userRepo.save_user(user)
    except RuntimeError:
        assert isinstance(result, str)
        print(result)


@pytest.mark.usefixtures('init_db', 'app')
def test__when_use_sqlite__then_verify_crud():
    user = TestWebApp.createUser()
    user.email = 'user@email.ro'
    user.alias = 'Emil'
    userRepo = UserRepo()
    userRepo.save_user(user)
    saved_user: User = userRepo.get_user_by_email('user@email.ro')
    print(saved_user.as_dict())
    assert saved_user.alias == 'Emil'
