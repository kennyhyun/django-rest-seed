import React from 'react';
import Signup from './components/signup';
import Dialog from '@material-ui/core/Dialog';


const SignupPage = ({
  onConfirm,
  classes
}) => (
  <>
    <Dialog aria-labelledby="simple-dialog-title" open>
      <Signup onConfirm={onConfirm}/>
    </Dialog>
  </>
);

export default SignupPage;

