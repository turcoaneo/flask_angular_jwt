import json
import unittest
from flask import current_app
from app import app


class TestWebApp(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_ctx = self.app.app_context()
        self.app_ctx.push()

    def tearDown(self):
        self.app_ctx.pop()
        self.app = None
        self.app_ctx = None

    def test_app(self):
        assert self.app is not None
        assert current_app == self.app

    def test_endpoint_return_ok(self):
        with app.test_client() as client:
            response = client.get('/hello')
            assert response._status_code == 200
            data = json.loads(response.get_data())
            self.assertEquals("Hello, Swagger World!", data['message'])
