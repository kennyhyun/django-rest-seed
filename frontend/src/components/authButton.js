import React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
};

function go(path) {
  const url = new URL(location.href);
  location.href = new URL(path, url.origin).href;
}

export default props => {
  const { user: { loggedIn, ...info } = {} } = props;
  return loggedIn
    ? <Button variant="contained" onClick={() => go('/signout')}>Sign out</Button>
    : <Button variant="contained" onClick={() => go('/signin')}>Sign in</Button>
  ;
};

