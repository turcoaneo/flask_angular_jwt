import os

import pytest

from app import create_app, db
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
        db.drop_all()
        db.create_all()
        TestWebApp.saveUser()
        yield
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
