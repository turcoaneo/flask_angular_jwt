from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/swagger-ui'


def set_config_swagger(config):
    config["API_TITLE"] = "Pumi Rest API"
    config["API_VERSION"] = "v1"
    config["OPENAPI_VERSION"] = "3.0.4"
    config["OPENAPI_URL_PREFIX"] = "/"


def create_swagger_ui():
    # Swagger UI route
    API_URL = '/static/swagger/swagger.json'
    return get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "Pumi REST API - Swagger"
        }
    )
