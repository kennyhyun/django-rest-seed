import React from 'react';
import { styled } from '@material-ui/styles';

const styles = {
};

export default props => {
  const { user: { loggedIn, ...info } = {} } = props;
  return loggedIn && (
    <ul>
      {Object.entries(info || {}).map(([k, v]) =>
        <li key={k}>
          {k} : {v}
        </li>
      )}
    </ul>
  );
};

