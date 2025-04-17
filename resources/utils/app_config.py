import os


JWT_EXPIRATION_MINUTES = os.getenv('JWT_EXPIRATION_MINUTES')


def set_config_jwt(config):
    config["JWT_SECRET_KEY"] = os.getenv('JWT_KEY')
    config['JWT_TOKEN_LOCATION'] = ['headers']


def set_config_env(config, env):
    config_dir = './resources/config/'
    if env is not None:
        if env == 'dev':
            config.from_pyfile(f'{config_dir}dev_settings.py')
        elif env == 'uat':
            config.from_pyfile(f'{config_dir}uat_settings.py')
        elif env == 'prod':
            config.from_pyfile(f'{config_dir}prod_settings.py')
        else:
            raise RuntimeError('Unknown environment setting provided.')
    else:
        config.from_pyfile(f'{config_dir}prod_settings.py')


def set_config_db(config):
    db_port = config['DATABASE_PORT']
    db_url = config['DATABASE_URL']
    db_name = config['DATABASE_NAME']
    db_user = config['DATABASE_USER']

    pw = os.getenv('DATABASE_PW')
    config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{db_user}:{pw}@{db_url}:{db_port}/{db_name}'
