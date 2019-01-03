## prerequisite

* python3
  `sudo apt-get install python3`
* pip3
  `sudo apt-get install python3-pip`

## Django project and apps

The project named as `baseproject`. Rename it if you want to.
`v1api` is an app for REST API.

- `/v1/` : Api root
- `/v1/users/` : User List
- `/v1/groups/` : Group List
- `/v1/api-token-auth/` : Obtain Json Web Token
- `/v1/api-token-refresh/`: Refresh Json Web Token
- `/v1/api-token-verify/`: Verify Json Web Token

## Setting up a new app

1. rename app directory
  `git mv baseproject newapp`
1. rename source files
  `sed -i 's/baseproject/newapp/g' $(grep -lr baseproject .)`
1. install virtualenv
  `sudo pip3 install virtualenv`
1. create env
  `virtualenv -p python3 djangoEnv3`
1. activate env
  `source djangoEnv3/bin/activate`
1. install requirements
  `pip3 install -r ./requirements.txt`
1. create RSA keys
  `openssl genrsa -out rsakey.pem`
  `openssl rsa -in rsakey.pem -pubout > rsakey.pub`
1. migrate dB
  `python manage.py migrate`
1. create admin
  `python manage.py createsuperuser`
1. build frontend
  `cd frontend && npm i && npm run build && cd -`

## run debug env

1. with virtualenv activated, run server
  `python3 manage.py runserver`

## test REST

call users by httpie

```
(djangoEnv3) $ http -a admin:adminpw http://127.0.0.1:8000/v1/users/
HTTP/1.0 200 OK
Allow: GET, POST, HEAD, OPTIONS
Content-Length: 161
Content-Type: application/json
Date: Sat, 09 Dec 2017 12:47:49 GMT
Server: WSGIServer/0.2 CPython/3.5.2
Vary: Accept, Cookie
X-Frame-Options: SAMEORIGIN

{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "email": "xxx@yyy.com",
            "groups": [],
            "url": "http://127.0.0.1:8000/v1/users/1/",
            "username": "admin"
        }
    ]
}
```


## generate UML for models

### install

```
sudo apt-get install python3-pygraphviz
sudo apt-get install libgraphviz-dev
sudo apt-get install pkg-config
```

### generate

```
./manage.py graph_models -a -g -o my_project_visualized.png
```

## Modules

- [Django REST framework](https://www.django-rest-framework.org/)
- [REST framework JWT Auth](http://getblimp.github.io/django-rest-framework-jwt/)

