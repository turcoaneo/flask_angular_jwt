import pytest

from .helper_test import client, app


@pytest.mark.usefixtures('app')
def test_hello(client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, Swagger World!"}


@pytest.mark.usefixtures('app')
def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.json is None
