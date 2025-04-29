import os

import pytest
from flask_smorest import Blueprint

from app import create_app, db

os.environ['ENVIRONMENT'] = 'test'


def register_test_api_blueprints(app, path="D:\\WORKSPACE\\Python\\pumi\\app\\resources\\api"):
    with app.app_context():
        for blp in get_blueprints(path):
            app.register_blueprint(blp)


def get_blueprints(path="D:\\WORKSPACE\\Python\\pumi\\app\\resources\\api"):
    py_files = [name for name in os.listdir(path)
                if not os.path.isdir(os.path.join(path, name)) and '__init__.py' not in name]
    # print(py_files)

    api_blueprints = list()
    for api_file in py_files:
        blp = get_blueprint_api(path, api_file)
        api_blueprints.append(blp)
    return api_blueprints


def get_blueprint_api(path, api_file) -> Blueprint:
    import importlib.util
    import sys

    spec = importlib.util.spec_from_file_location("module.name", f"{path}\\{api_file}")
    foo = importlib.util.module_from_spec(spec)
    sys.modules["module.name"] = foo
    spec.loader.exec_module(foo)
    for attr_name in dir(foo):
        attr = getattr(foo, attr_name)
        if isinstance(attr, Blueprint):
            # print(attr)
            return attr


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
        from app.test.test_unit_user_api import TestWebApp
        db.session.rollback()
        db.drop_all()
        db.create_all()
        TestWebApp.saveUser()
        yield
        db.session.rollback()
        db.session.flush()
        db.session.remove()
        db.drop_all()
