import pytest

from app.test.test_unit_user_api import TestWebApp
from ..helper_test import client, app, init_db


@pytest.mark.usefixtures('init_db', 'app')
def test_backend_e2e_get_users(client):
    response = client.get('/user/')
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')
