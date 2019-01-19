#!/usr/bin/env bash

if [[ -z "${EMAIL}" ]]; then
  echo "env var EMAIL is undefined"
  exit
fi
if [[ -z "${PASSWD}" ]]; then
  echo "env var PASSWD is undefined"
  exit
fi

# pull or clone
git -C source pull || git clone ../.. source

# create rsakey if not exists
KEYFILE=rsakey.pem
if [ ! -f $KEYFILE ]; then
    openssl genrsa -out $KEYFILE
fi
PUBKEYFILE=rsakey.pub
if [ ! -f $PUBKEYFILE ]; then
    openssl rsa -in $KEYFILE -pubout > $PUBKEYFILE
fi

./build.docker

# docker build -f django.Dockerfile .
docker-compose run django python manage.py migrate &&\
  echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('$EMAIL', '$EMAIL', '$PASSWD')" | docker-compose run django python manage.py shell



