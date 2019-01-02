from django.shortcuts import render, redirect
from .forms import SignUpForm
import logging
logger = logging.getLogger(__name__)

def home(request):
    return render(request, 'index.html', { 'errors': 'null' })

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate

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
            return render(request, 'index.html', { 'errors': form.errors.as_json() })
    return render(request, 'index.html', { 'errors': 'null' })
