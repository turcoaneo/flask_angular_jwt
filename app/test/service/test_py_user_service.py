import pytest

from app.resources.repository.user_repo import UserRepo
from app.resources.service.user_service import UserService
from app.test.test_unit_user_api import TestWebApp
from ..helper_test import app


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_get_all_users(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_all_users", return_value=mock_user_list)
    userService = UserService()
    response = userService.get_all_users()
    assert response.status_code == 200
    TestWebApp.assert_response_facade(response, 'email', 'user@admin.ro', 0)


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_null_get_all_users(mocker):
    mocker.patch.object(UserRepo, "get_all_users", return_value=None)
    userService = UserService()
    response = userService.get_all_users()
    assert response.status_code == 200
    TestWebApp.assert_response_facade(response)


@pytest.mark.usefixtures('app')
def test__when_verify_methods__then_ok(mocker):
    method_list = [func for func in dir(UserRepo) if
                   callable(getattr(UserRepo, func)) and not func.startswith("__")]
    print(method_list)
    mocker.patch.object(UserRepo, method_list[0], return_value=None)
    service = UserService()
    service_method = getattr(service, method_list[0])
    response = service_method()
    assert response.status_code == 200
    TestWebApp.assert_response_facade(response)


# @formatter:off
@pytest.mark.usefixtures('app')
@pytest.mark.parametrize("service_method, repo_method, mock_return_val, mock_param, expected_status, "
                         "expected_attr, expected_value, expected_index",
[
    ('get_all_users', 'get_all_users', None, None, 200, None, None, None),
    ('get_all_users', 'get_all_users', [TestWebApp.createUser()], None, 200, 'email', 'user@admin.ro', 0),
    ('get_users_by_alias', 'get_users_by_alias', None, 'alias', 200, None, None, None),
    ('get_users_by_alias', 'get_users_by_alias', [TestWebApp.createUser()], 'alias', 200, 'alias', 'Alias', 0),
    ('get_user_by_id', 'get_user_by_id', None, 111, 404, None, None, None),
    ('get_user_by_id', 'get_user_by_id', TestWebApp.createUser(), 111, 200, 'alias', 'Alias', None),
    ('get_user_by_alias', 'get_user_by_alias', None, 'alias', 404, None, None, None),
    ('get_user_by_alias', 'get_user_by_alias', TestWebApp.createUser(), 'alias', 200, 'alias', 'Alias', None),
])
# @formatter:on
def test__when_parametrize__then_run_one_by_one(mocker, service_method, repo_method, mock_return_val, mock_param,
                                                expected_status, expected_attr, expected_value, expected_index):
    mocker.patch.object(UserRepo, repo_method, return_value=mock_return_val)
    service = UserService()
    service_method = getattr(service, service_method)
    if mock_param is not None:
        response = service_method(mock_param)
    else:
        response = service_method()
    assert response.status_code == expected_status
    TestWebApp.assert_response_facade(response, expected_attr, expected_value, expected_index)
