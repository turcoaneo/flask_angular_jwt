# Import the Flask app instance from the main app file
from app import create_app
# Import pytest for writing and running tests
import pytest


@pytest.fixture
def client():
    """A test client for the app."""
    test_app = create_app()
    with test_app.test_client() as client:
        yield client


def test_hello(client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, Swagger World!"}


def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.json is None


def test_get_user(client):
    response = client.get('/user/')
    assert response.status_code == 404  # ????!!
