import os

from flask_smorest import Blueprint


def register_test_api_blueprints(app, path="D:\\WORKSPACE\\Python\\pumi\\app\\resources\\api"):
    with app.app_context():
        for blp in get_blueprints(path):
            app.register_blueprint(blp)


def get_blueprints(path="D:\\WORKSPACE\\Python\\pumi\\app\\resources\\api"):
    py_files = [name for name in os.listdir(path)
                if not os.path.isdir(os.path.join(path, name)) and '__init__.py' not in name]
    print(py_files)

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
            print(attr)
            return attr
