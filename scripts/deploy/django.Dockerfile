FROM python:3 AS base
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY source/requirements.txt /code/
RUN pip install -r requirements.txt
COPY rsakey.pem /code/
COPY rsakey.pub /code/

from base AS deploy
COPY ./source /code/
COPY settings_local.py /code/baseproject/
