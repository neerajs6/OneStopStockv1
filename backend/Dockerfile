FROM python:3.7.6


WORKDIR /app/backend

ENV FLASK_APP=endpoints.py
ENV FLASK_ENV=development

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["flask", "run"]

