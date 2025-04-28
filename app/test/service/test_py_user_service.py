import pytest

from app.resources.repository.user_repo import UserRepo
from app.resources.service.user_service import UserService
from app.test.test_unit_user_api import TestWebApp
from ..helper_test import app


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_service_result(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_all_users", return_value=mock_user_list)
    userService = UserService()
    response = userService.get_all_users()
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')
