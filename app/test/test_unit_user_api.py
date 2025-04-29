import json
import os
import unittest
from datetime import datetime

from flask import current_app

from app import create_app, db
from app.test.helper_test import register_test_api_blueprints, get_blueprints


class TestWebApp(unittest.TestCase):
    def setUp(self):
        print('Set up test ENV...')
        os.environ['ENVIRONMENT'] = 'test'
        self.app = create_app()
        register_test_api_blueprints(self.app)
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()

        print('Creating DB...')
        db.create_all()

        TestWebApp.saveUser()

    @staticmethod
    def saveUser():
        from app.resources.service.user_service import UserService
        user_service = UserService()
        user = TestWebApp.createUser()
        user_service.create_user(user.__dict__)

    @staticmethod
    def createUser():
        from app.resources.models.user import User
        user = User('user@admin.ro', 'Alias')
        timestamp = datetime.now()
        user.expire = timestamp
        user.created = timestamp
        user.password_hash = 'user234*'
        return user

    def tearDown(self):
        print('Tearing down...')
        print('DB - dropped all!')
        db.drop_all()
        self.app_ctx.pop()
        self.app = None
        self.app_ctx = None

    def test_app(self):
        assert self.app is not None
        assert current_app == self.app

    def test_backend_e2e_get_users(self):
        with self.app.test_client() as client:
            response = client.get('/user/')
            assert response._status_code == 200
            TestWebApp.assert_response_list_element_equals(response, 0, 'alias', 'Alias')

    def test_module(self):
        blueprints = get_blueprints()
        assert len(blueprints) == 2

    def test_endpoint_return_ok(self):
        with self.app.test_client() as client:
            response = client.get('/hello')
            assert response._status_code == 200
            data = json.loads(response.get_data())
            self.assertEqual("Hello, Swagger World!", data['message'])

    @staticmethod
    def assert_response_equals(response, attr, value):
        data = json.loads(response.data.decode('utf-8'))
        assert data[attr] == value

    @staticmethod
    def assert_response_empty(response):
        data = json.loads(response.data.decode('utf-8'))
        if isinstance(data, list):
            assert data == []
        else:
            if hasattr(data, 'response'):
                assert data['response'] is None

    @staticmethod
    def assert_response_list_element_equals(response, index, attr, value):
        data = json.loads(response.data.decode('utf-8'))
        assert data[index][attr] == value

    @staticmethod
    def assert_response_facade(response, attr=None, value=None, index=None):
        if attr is not None:
            if index is not None:
                TestWebApp.assert_response_list_element_equals(response, index, attr, value)
            else:
                TestWebApp.assert_response_equals(response, attr, value)
        else:
            TestWebApp.assert_response_empty(response)
