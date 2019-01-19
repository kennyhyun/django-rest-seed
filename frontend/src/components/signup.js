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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Grid from '@material-ui/core/Grid';

import { compose, withState } from 'recompose';
import { Row } from './common';
import { parseFormValueFromElements } from '../helpers';


const styles = theme => ({
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
    margin: [[32, 0]],
    textAlign: 'center',
    position: 'relative',
    '&::after': {
      content: '"or"',
      position: 'absolute',
      padding: [[0, 12]],
      transform: 'translate3d(-18px, -10px, 0)',
      backgroundColor: 'white',
    }
  },
  button: {
    textTransform: 'none',
  },
  textField: {},
  formControl: {
    margin: [[theme.spacing.unit * 2, 0, theme.spacing.unit, 0]],
    minWidth: 120,
  },
  card: {
    overflowY: 'auto',
  },
});

class Signup extends React.Component {
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
    if (key === 'country') {
      const mobile = this.formRef.current.elements.mobileNo.value;
      if (!values.country && mobile) {
        this.setState({ errors: { ...this.state.errors, country: 'country is required' } });
      } else {
        this.setState({ errors: { ...this.state.errors, country: '' } });
      }
    } else if (key) {
      this.setState({ errors: { ...this.state.errors, [key]: errors[key] } });
    } else {
      this.setState({ errors });
    }
  };

  validateAndConfirm = e => {
    const { values, errors } = parseFormValueFromElements(this.formRef.current.elements);
    if (values.mobileNo && !values.country) {
      errors.country = 'country is required';
    }
    this.setState({ errors });
    if (!Object.keys(errors).length) {
      this.props.onConfirm(values);
    }
  };

  render () {
    const {
      country,
      setCountry,
      classes,
    } = this.props;
    const { errors = {} } = this.state;
    return (
      <Card classes={{ root: classes.card }} >
        <CardHeader title="Sign up" classes={{ root: classes.header }}/>

        <CardContent>
          <form ref={this.formRef} className="signup">
            <TextField
              required
              label="Name"
              name="name"
              id="Name"
              defaultValue=""
              fullWidth
              className={classes.textField}
              margin="normal"
              {...this.getErrorProps('name')}
              onBlur={this.validate}
            />

            <TextField
              required
              label="Email"
              id="Email"
              name="username"
              type="email"
              defaultValue=""
              fullWidth
              className={classes.textField}
              margin="normal"
              {...this.getErrorProps('username')}
              onBlur={this.validate}
            />

            <TextField
              required
              label="Password"
              name="password1"
              id="Password"
              type="password"
              defaultValue=""
              fullWidth
              className={classes.textField}
              margin="normal"
              {...this.getErrorProps('password1')}
              onBlur={this.validate}
            />

            <Row>
              <FormControl className={classes.formControl} error={!!errors.country}
      >
                <InputLabel htmlFor="age-simple">Country</InputLabel>
                <Select
                  value={country}
                  onChange={e => console.log(e.target) || setCountry(e.target.value)}
                  inputProps={{
                    id: 'Country',
                    name: 'country',
                  }}
                  onBlur={this.validate}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Korea">Korea</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                </Select>
                {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
              </FormControl>

              &nbsp;

              <TextField
                label="MobileNo"
                id="MobileNo"
                name="mobileNo"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                {...this.getErrorProps('MobileNo')}
                onBlur={this.validate}
              />
            </Row>

            <Divider component="div" classes={{ root: classes.divider }}/>

            <Row>
              <Button fullWidth variant="contained" color="primary" className={classes.button}>
                Facebook ID Sign up
              </Button>
            </Row>

            <Row>
              <Button fullWidth variant="contained" color="secondary" className={classes.button}>
                Naver ID Sign up
              </Button>
            </Row>
          </form>

        </CardContent>

        <CardActions classes={{ root: classes.action }}>
            <Row>
              <Typography gutterBottom variant="h6" component="h5">
                I have read and agree to
              </Typography>
              <Button className={classes.button} color="primary">
                Terms of Service / Privacy Polocies
              </Button>
            </Row>

            <Row>
              <Button className={classes.button} variant="contained" onClick={this.validateAndConfirm}>
                Sign me up
              </Button>
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

Signup.defaultProps = { ...defaultProps(types) };
Signup.propTypes = { ...propTypes(types) };

export default compose(
  withState('country', 'setCountry', ''),
  withStyles(styles)
)(Signup);

