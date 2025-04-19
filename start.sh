#!/bin/sh

flask db upgrade
gunicorn --bind 0.0.0.0:80 main:app
