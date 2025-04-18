# Import the Flask app instance from the main app file
from app import app
# Import pytest for writing and running tests
import pytest

from resources.utils.blueprint_iterator import identify_blueprints_dynamically


@pytest.fixture
def client():
    """A test client for the app."""
    with app.test_client() as client:
        yield client


def test_hello(client):
    """Test the home route."""
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, Swagger World!"}


def test_get_user(client):
    for blp in identify_blueprints_dynamically('resources.api'):
        app.register_blueprint(blp)
    """Test the home route."""
    response = client.get('/user/')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, Swagger World!"}
