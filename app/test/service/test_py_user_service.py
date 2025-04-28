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
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_null_get_all_users(mocker):
    mocker.patch.object(UserRepo, "get_all_users", return_value=None)
    userService = UserService()
    response = userService.get_all_users()
    assert response.status_code == 200
    TestWebApp.assert_response_empty_list(response)


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_null_get_user_by_id(mocker):
    mocker.patch.object(UserRepo, "get_user_by_id", return_value=None)
    userService = UserService()
    response = userService.get_user_by_id(None)
    assert response.status_code == 404
    TestWebApp.assert_response_empty(response)


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_get_user_by_id(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_user_by_id", return_value=mock_user_list[0])
    userService = UserService()
    response = userService.get_user_by_id(111)
    assert response.status_code == 200
    TestWebApp.assert_response_equals(response, 'email', 'user@admin.ro')


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_null_get_user_by_alias(mocker):
    mocker.patch.object(UserRepo, "get_user_by_alias", return_value=None)
    userService = UserService()
    response = userService.get_user_by_alias(None)
    assert response.status_code == 404
    TestWebApp.assert_response_empty(response)


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_get_user_by_alias(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_user_by_alias", return_value=mock_user_list[0])
    userService = UserService()
    response = userService.get_user_by_alias('alias')
    assert response.status_code == 200
    TestWebApp.assert_response_equals(response, 'email', 'user@admin.ro')


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_get_users_by_alias(mocker):
    mock_user_list = [TestWebApp.createUser()]
    mocker.patch.object(UserRepo, "get_users_by_alias", return_value=mock_user_list)
    userService = UserService()
    response = userService.get_users_by_alias('alias')
    assert response.status_code == 200
    TestWebApp.assert_response_list_element_equals(response, 0, 'email', 'user@admin.ro')


@pytest.mark.usefixtures('app')
def test__when_mock_repo__then_verify_null_get_users_by_alias(mocker):
    mocker.patch.object(UserRepo, "get_users_by_alias", return_value=None)
    userService = UserService()
    response = userService.get_users_by_alias('alias')
    assert response.status_code == 200
    TestWebApp.assert_response_empty_list(response)
