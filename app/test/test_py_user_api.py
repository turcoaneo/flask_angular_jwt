import os

import pytest

from app import create_app, db
from app.resources.models.user import User
from app.resources.repository.user_repo import UserRepo
from app.resources.service.user_service import UserService
from app.test.helper_test import register_test_api_blueprints
from app.test.test_unit_user_api import TestWebApp

os.environ['ENVIRONMENT'] = 'test'


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = create_app()
    with app.app_context():
        register_test_api_blueprints(app)
        yield app


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


@pytest.fixture()
def init_db(app):
    """Initialize the database."""
    with app.app_context():
        db.session.rollback()
        db.drop_all()
        db.create_all()
        TestWebApp.saveUser()
        yield
        db.session.rollback()
        db.session.flush()
        db.session.remove()
        db.drop_all()


def test_hello(client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, Swagger World!"}


def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.json is None


@pytest.mark.usefixtures('init_db')
def test_backend_e2e_get_users(client):
    response = client.get('/user/')
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')


def test__when_mock_service__then_verify_payload(client, mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserService, "get_all_users", return_value=mock_user_list)
    response = client.get('/user/')
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_service_result(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_all_users", return_value=mock_user_list)
    userService = UserService()
    response = userService.get_all_users()
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')


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
