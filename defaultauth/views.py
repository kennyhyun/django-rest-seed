from django.shortcuts import render, redirect
from .forms import SignUpForm
import json
import logging
logger = logging.getLogger(__name__)

def home(request):
    context = { 'errors': 'null', 'user': json.dumps({ 'loggedIn': False }) }
    if request.user.is_authenticated:
        context['user'] = json.dumps({
            'loggedIn': request.user.is_authenticated,
            'name': request.user.first_name,
            'email': request.user.username,
            'country': request.user.profile.country,
            'mobileNo': request.user.profile.mobile_no,
        })
    return render(request, 'index.html', context)

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout, login, authenticate

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)

        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            logger.error('{} {}', 'post', form.cleaned_data)
            user.first_name = form.cleaned_data.get('name')
            user.email = form.cleaned_data.get('username')
            user.profile.country = form.cleaned_data.get('country')
            user.profile.mobile_no = form.cleaned_data.get('mobileNo')
            user.save()
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'index.html', { 'user': 'null', 'errors': form.errors.as_json() })
    return render(request, 'index.html', { 'errors': 'null', 'user': 'null' })

def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        logger.error('{} {} {}', 'signin post', username, password)
        user = authenticate(username=username, password=password)
        if user is None:
            return render(request, 'index.html', {
                'user': 'null',
                'errors': json.dumps({ 'signin': [{ 'message': 'invalid signin' }] })
            })
        else:
            login(request, user)
            return redirect('home')
    return render(request, 'index.html', { 'errors': 'null', 'user': 'null' })

def signout(request):
    logout(request)
    return redirect('home')

from rest_framework_jwt.utils import jwt_payload_handler
def jwt_payload(user):
    payload = jwt_payload_handler(user)
    payload['name'] = user.first_name
    payload['mobileNo'] = user.profile.mobile_no
    payload['country'] = user.profile.country
    return payload
