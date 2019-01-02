import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import App from '../src/app';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('App', module)
  .add('foo.bar/', () => <App history={{ location: 'http://foo.bar' }}
    user={{
      loggedIn: true,
      email: 'email@address',
      name: 'John Doe',
      country: 'A country',
      mobileNo: '0000',
    }}
    />)
  .add('foo.bar/ with errors', () =>
    <App history={{ location: 'http://foo.bar' }} errors={{
      "name": [{"message": "This field is required.", "code": "required"}], "password1": [{"message": "This field is required.", "code": "required"}], "password2": [{"message": "This field is required.", "code": "required"}], "username": [{"message": "This field is required.", "code": "required"}]
    }}/>)
  .add('foo.bar/signin', () =>
    <App history={{ location: 'http://foo.bar/signin' }} onConfirm={action('confirm')}/>)
  .add('foo.bar/signup', () =>
    <App history={{ location: 'http://foo.bar/signup' }} onConfirm={action('confirm')}/>
  )
  .add('foo.bar/not-exists', () => <App history={{ location: 'http://foo.bar/not-exists' }}/>)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
