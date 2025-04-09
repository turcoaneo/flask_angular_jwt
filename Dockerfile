FROM python:3.11.4-alpine3.18

# upgrade pip
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED=1
#ENV DATABASE_URL='cluster-db-aurora-instance-1.cn48a44e27uj.eu-north-1.rds.amazonaws.com'
#ENV DATABASE_URL='mysql-community-db.cn48a44e27uj.eu-north-1.rds.amazonaws.com'
#ENV DATABASE_PORT='3306'
#ENV DATABASE_NAME='uat_db'
#ENV DATABASE_USER='admin'
#ENV DATABASE_PW='Sky_Auro#*75'
COPY . .

#CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:app"]
