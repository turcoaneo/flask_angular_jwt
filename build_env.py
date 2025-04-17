import os
import subprocess

CURRENT_DIRECTORY = os.getcwd()

directory = 'angular-pumi'

ANGULAR_PROJECT_PATH = os.path.join(CURRENT_DIRECTORY, directory)
DIST_PATH = os.path.join(ANGULAR_PROJECT_PATH, 'dist', directory, 'browser')

FLASK_STATIC_PATH = os.path.join(CURRENT_DIRECTORY, 'static')
FLASK_TEMPLATES_PATH = os.path.join(CURRENT_DIRECTORY, 'templates')

env = os.getenv('ENVIRONMENT', ' ')
if env != ' ':
    print(f'ENVIRONMENT: {env}')
    env = f' -c {env} '
else:
    print(f'ENVIRONMENT: prod')
command_build = f' && ng build{env}--base-href /static/'
subprocess.call(('cd ' + ANGULAR_PROJECT_PATH + command_build), shell=True)


def move_built_files(path, extension):
    path_static = path + '\\'
    command = 'del ' + path_static + extension
    subprocess.call(command, shell=True)
    command = 'move ' + DIST_PATH + '\\' + extension + ' ' + path_static
    subprocess.call(command, shell=True)


def copy_public_files(path, extension):
    path_static = path + '\\'
    command = 'del ' + path_static + extension
    subprocess.call(command, shell=True)
    public_path = os.path.join(ANGULAR_PROJECT_PATH, 'public')
    command = 'copy ' + public_path + '\\' + extension + ' ' + path
    subprocess.call(command, shell=True)


def replace_index_links():
    filein = FLASK_TEMPLATES_PATH + os.path.sep + "index.html"
    fileout = FLASK_TEMPLATES_PATH + os.path.sep + "index.html"
    f = open(filein, 'r')
    filedata = f.read()
    f.close()

    new_data = filedata.replace('href="styles', 'href="../static/styles')
    new_data = new_data.replace('href="chunk', 'href="../static/chunk')
    new_data = new_data.replace('src="main', 'src="../static/main')
    new_data = new_data.replace('src="polyfills', 'src="../static/polyfills')

    f = open(fileout, 'w')
    f.write(new_data)
    f.close()


try:
    move_built_files(FLASK_STATIC_PATH, '*.js')
    move_built_files(FLASK_STATIC_PATH, '*.css')
    copy_public_files(FLASK_STATIC_PATH, '*.png')
    move_built_files(FLASK_TEMPLATES_PATH, '*.html')
    replace_index_links()
except Exception as e:
    print(e)
