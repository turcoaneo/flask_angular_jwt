FROM python:3.11.4-alpine3.18

# upgrade pip
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED=1
COPY . .

#CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
CMD ["gunicorn", "--bind", "0.0.0.0:80", "app:app"]
CMD ["flask", "db", "upgrade"]

#CMD flask db upgrade
