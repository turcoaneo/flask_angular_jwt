# pumi app: angular flask sqlalchemy mysql
Integrating angular with python and sqlalchemy for mysql docker container
## install
python -m venv venv
venv\Scripts\activate
python.exe -m pip install --upgrade pip
python -m pip install -r requirements.txt

## ng
ng new angular-pumi
cd angular-pumi
npm cache clean --force
npm install
ng generate component home
ng g c components/header
### ng create ENVs
cd angular-pumi
ng g environments for ng generate environments

## docker - mysql
docker run -p 3307:3306 --name pumi-dev-mysql -e MYSQL_ROOT_PASSWORD=*** -e MYSQL_DATABASE=dev_db -d mysql:8.4.4
### enter docker mysql bash
docker exec -it pumi-dev-mysql /bin/bash
### check version
docker exec my-mysql bash -c "mysql -V" or docker inspect mysql | grep MYSQL_

mysql -h 127.0.0.1 -P 3306 -u root -p
Enter password: ***
### switch to database name (mydb)
USE mydb

### alembic flask migrate
flask db init
flask db migrate -m "initial migration"
flask db upgrade
flask db downgrade

## aws
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 509399624827.dkr.ecr.eu-north-1.amazonaws.com

docker build -t pumi-repo .
docker tag pumi-repo:latest 509399624827.dkr.ecr.eu-north-1.amazonaws.com/pumi-repo:latest
docker push 509399624827.dkr.ecr.eu-north-1.amazonaws.com/pumi-repo:latest

aws ecs update-service --cluster cluster-pumi --service service-pumi --force-new-deployment > app/resources/sample_update_service.json

## Github CLI
### UAT
gh workflow run "Deploy UAT to Amazon ECS" --ref deployment-fe-uat
gh run list --workflow=deploy-uat.yml
### PROD
gh workflow run "Deploy PROD to Amazon ECS" --ref deployment-fe-prod
gh run list --workflow=deploy-prod.yml

### add .env to .gitignore and remove cache
git rm --cached -- .env;

## run tests in cmd
### python
[//]: # (runs all, including unittest)
python -m pytest

[//]: # (runs only unittest with logs)
python -m unittest
### ng
npx jest --clearCache && npx jest

## Run individual parameterized test from command line (terminal)
### Not working in Pycharm individually, only at class level
pytest test/test_ner_client.py -k test_givenModel_whenCallSpacy_thenReturnGroup

## Run end-2-end test
### ...in terminal, first step
python app.py
venv\Scripts\python app.py (Windows cmd)
### Run test from Pycharm
test_index_has_form
### or run from other terminal
### Run one test method
pytest app/test/e2e/test_selenium_index_e2e.py -k test_index_has_form
### Run one test method from virtual env (Git Bash)
venv/Scripts/pytest app/test/e2e/test_selenium_index_e2e.py -k test_index_has_form
### Run class test methods from virtual env (Windows cmd)
venv\Scripts\pytest app/test/e2e/test_selenium_index_e2e.py
