import React from 'react'
import ReactDOM from 'react-dom'

import App from './app';

const history = document ? document : {};
const csrf_input = document.querySelector('form input[name="csrfmiddlewaretoken"]');
const { value: csrf_token } = csrf_input;

const onConfirm = args => {
  const [, form] = document.querySelectorAll('form');
  form.appendChild(csrf_input);
  const passwordInput = document.querySelector('form input[name="password1"]');
  const passwordInput2 = passwordInput.cloneNode();
  passwordInput2.name = 'password2';
  passwordInput2.id = passwordInput2.name;
  form.appendChild(passwordInput2);
  form.method = 'post';
  form.submit();
};

ReactDOM.render(
  <App
    history={history}
    onConfirm={onConfirm}
    user={typeof user != 'undefined' && user}
    errors={typeof errors != 'undefined' && errors}
  />,
  document.getElementById('react')
);
