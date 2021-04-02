FROM python:3.7-alpine

RUN adduser -D habit-tracker

WORKDIR /home/habit-tracker

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN apk add --no-cache gcc musl-dev python3-dev libffi-dev openssl-dev cargo \
        libxslt-dev
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

RUN apk del gcc musl-dev python3-dev libffi-dev openssl-dev cargo \
        libxslt-dev

COPY app app
COPY habit-tracker.py config.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP habit-tracker.py

RUN chown -R habit-tracker:habit-tracker ./
USER habit-tracker

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]