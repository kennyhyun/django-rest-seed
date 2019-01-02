import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { defaultProps, propTypes } from 'proptypes-helper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import { Row } from './common';
import { parseFormValueFromElements } from '../helpers';


const styles = {
  header: {
    textAlign: 'center',
  },
  action: {
    borderTop: 'solid 1px lightgray',
    display: 'block',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  divider: {
    margin: '32px 0',
    textAlign: 'center',
    position: 'relative',
    '&::after': {
      content: '"or"',
      position: 'absolute',
      padding: '0 12px',
      transform: 'translate3d(-18px, -10px, 0)',
      backgroundColor: 'white',
    }
  },
  button: {
    textTransform: 'none',
  },
  textField: {},
  card: {
    overflowY: 'auto',
  },

};

class Signin extends React.Component {
  constructor(p) {
    super(p);
    this.formRef = React.createRef();
    this.state = {
      errors: {},
    };
  }

  getErrorProps = name => {
    const helperText = name && this.state.errors[name];
    if (helperText) {
      return {
        error: true,
        helperText,
      };
    }
    return  {};
  };

  validate = e => {
    const key = e && e.target.name;
    const { values, errors } = parseFormValueFromElements(this.formRef.current.elements, key && [key]);
    if (key) {
      this.setState({ errors: { ...this.state.errors, [key]: errors[key] } });
    } else {
      this.setState({ errors });
    }
  };

  signup = e => {
    this.props.onConfirm({ redirect: 'signup' });
  };

  validateAndConfirm = () => {
    const { values, errors } = parseFormValueFromElements(this.formRef.current.elements);
    this.setState({ errors });
    if (!Object.keys(errors).length) {
      this.props.onConfirm(values);
    }
  };
  
  render() {
    const {
      classes
    } = this.props;
    return (
      <Card classes={{ root: classes.card }} >
        <CardHeader title="Sign in" classes={{ root: classes.header }}/>

        <CardContent>
          <form ref={this.formRef} className="signin">
            <TextField
              required
              label="Email"
              id="username"
              name="username"
              type="email"
              defaultValue=""
              fullWidth
              className={classes.textField}
              margin="normal"
              {...this.getErrorProps('username')}
              onBlur={this.validate}
              onKeyPress={e => e.charCode == 13 && this.validateAndConfirm()}
            />

            <TextField
              required
              label="Password"
              name="password"
              id="password"
              type="password"
              defaultValue=""
              fullWidth
              className={classes.textField}
              margin="normal"
              {...this.getErrorProps('password')}
              onBlur={this.validate}
              onKeyPress={e => e.charCode == 13 && this.validateAndConfirm()}
            />

            <Row>
              <Button color="primary" className={classes.button}>
                Forgotton password?
              </Button>

              <Button color="primary" className={classes.button}>
                Forgotton account email?
              </Button>
            </Row>

            <Row>
              <Button variant="contained" className={classes.button} onClick={this.validateAndConfirm}>
                Sign in
              </Button>
            </Row>

            <Divider component="div" classes={{ root: classes.divider }}/>

            <Row>
              <Button variant="contained" color="primary" className={classes.button}>
                Facebook ID Sign IN
              </Button>
            </Row>

            <Row>
              <Button variant="contained" color="secondary" className={classes.button}>
                Naver ID Sign IN
              </Button>
            </Row>
          </form>

        </CardContent>

        <CardActions classes={{ root: classes.action }}>
            <Row>
              <Typography gutterBottom variant="h6" component="h4">
                Don't have an account?
              </Typography>
            </Row>

            <Row>
              <Button className={classes.button} color="primary" onClick={this.signup}>Sign me up</Button>
            </Row>
        </CardActions>
      </Card>
    );
  }
}

const types = {
  required: {
    onConfirm: () => {},
  },
  optional: {
  },
};

Signin.defaultProps = { ...defaultProps(types) };
Signin.propTypes = { ...propTypes(types) };

export default withStyles(styles)(Signin);

