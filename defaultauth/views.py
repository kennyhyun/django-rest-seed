from django.shortcuts import render
from .forms import SignUpForm

def home(request):
    return render(request, 'index.html', {})

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            user.profile.name = form.cleaned_data.get('name')
            user.profile.location = form.cleaned_data.get('location')
            user.profile.mobileNo = form.cleaned_data.get('mobileNo')
            user.save()

            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'index.html', { 'errors': form.errors.as_json(escape_html=False) })
    return render(request, 'index.html', {})
