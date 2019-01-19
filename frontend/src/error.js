import React from 'react';

const Error = (props) => (
  <>
    <h1>Error {props.errorCode}!</h1>
    {props.pathname && <span>
      {props.pathname}
    </span>}
  </>
);

export default Error;
