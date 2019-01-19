import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Signin from './components/signin';


const SignupPage = ({
  onConfirm,
  classes
}) => (
  <>
    <Dialog aria-labelledby="simple-dialog-title" open>
      <Signin onConfirm={onConfirm}/>
    </Dialog>
  </>
);

export default SignupPage;

