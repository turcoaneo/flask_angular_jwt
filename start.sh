#!/bin/sh

#flask db upgrade
#gunicorn --bind 0.0.0.0:80 app:app
#gunicorn --bind 127.0.0.1:5000 main:create_app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
