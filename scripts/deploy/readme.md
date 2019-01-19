## settings

Production using postgresql.
edit/create `settings_local.py` for the database host info

`settings_local.py` is to override the `settings.py`
review ALLOWED_HOSTS for the deployment.

## sequence

- enter swarm mode/create traefik
  `./create-swarm-treafik`
- `prepare`
- `update`
- `start`

This docker service uses docker hub repository.
Please login advance and set the Docker Hub username

```
$ export DOCKERHUB_USER=kennyhyun
$ docker login
```

## prepare

build docker image and migrate the database

```
$ EMAIL=user@domain PASSWD=shhhhh ./prepare.sh
```

EMAIL/PASSWD is for the administrator

## update

build webpack and update the docker image

```
$ ./update.sh
```

## start/stop

`./start.sh` deploys a stack

`./stop.sh` remove the stack

