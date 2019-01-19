#!/usr/bin/env bash

docker stack deploy -c docker-compose.prod.yml api
