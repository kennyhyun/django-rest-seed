from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    name = forms.CharField(max_length=30, help_text='Required.')
    location = forms.CharField(max_length=30, required=False)
    mobileNo = forms.CharField(max_length=16, required=False)

    class Meta:
        model = User
        fields = ('username', 'name', 'password1', 'location', 'mobileNo' )
