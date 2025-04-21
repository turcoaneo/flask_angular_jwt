from app import create_app, register_api_blueprints

app = create_app()

register_api_blueprints(app)
