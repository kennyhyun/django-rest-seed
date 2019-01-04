
`/storage/django` in the docker machine is used for consistent storage.
refer to `docker-compose.yml`
`db.sqlite3` file is generated in the `/storage/` in the container

## sequence

`prepare` - `update` - `start`

## prepare

build docker image and migrate the `db.sqlite3`

```
$ EMAIL=user@domain PASSWD=shhhhh ./prepare.sh
```

## update

build webpack and update the docker image

```
$ ./update.sh
```

If the container is running,

`docker-compose restart`

## start

`docker-compose start`

## settings

`settings_local.py` is to override the `settings.py`
review ALLOWED_HOSTS for the deployment.
