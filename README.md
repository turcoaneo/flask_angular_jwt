# flask_angular_sqlalchemy
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

## docker - mysql
docker run -p 3307:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb -d mysql:latest
### enter docker mysql bash
docker exec -it my-mysql /bin/bash
### check version
docker exec my-mysql bash -c "mysql -V" or docker inspect mysql | grep MYSQL_

mysql -h 127.0.0.1 -P 3306 -u root -p
Enter password: my-secret-pw
### switch to database name (mydb)
USE mydb

## aws
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 509399624827.dkr.ecr.eu-north-1.amazonaws.com

docker build -t pumi-repo .
docker tag pumi-repo:latest 509399624827.dkr.ecr.eu-north-1.amazonaws.com/pumi-repo:latest
docker push 509399624827.dkr.ecr.eu-north-1.amazonaws.com/pumi-repo:latest

aws ecs update-service --cluster cluster-pumi --service service-pumi --force-new-deployment > app/resources/sample_update_service.json