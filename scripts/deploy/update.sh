#!/usr/bin/env bash

if [[ -z "${DOCKERHUB_USER}" ]]; then
    echo "env var DOCKERHUB_USER is undefined"
    exit
fi



./build.npm &&\
  ./build.docker
