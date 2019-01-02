import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import UserInfo from './components/userInfo';

function Welcome(props) {
  return (
    <>
      <h1>Hello {props.name.toUpperCase()}!</h1>
      <UserInfo user={props.user}/>
    </>
  );
}

const Error = ({ errors }) =>
  Object.entries(errors).map(([k, v]) => {
    return <div key={k}>{k}: {v.map(e => e.message).join(', ')}</div>;
  });

class App extends React.Component {
  constructor(p) {
    super(p);
    console.log('creating app', p);
    const url = new URL(p.history.location);
    console.log(url.pathname);
    switch (url.pathname) {
      case '/':
        this.child = Welcome;
        this.childProps = { name: 'world from app', user: p.user };
        break;
      default:
        try {
          this.child = require(`.${url.pathname}`).default;
          this.childProps = { onConfirm: p.onConfirm };
        } catch (err) {
          console.error(err);
          this.child = require('./error').default;
          this.childProps = { errorCode: 404, pathname: url.pathname };
        }
        break;
    }
    this.state = { showError: !!p.errors };
  }

  render() {
    const { errors } = this.props;
    console.log('app', this.child);
    return <>
      <this.child {...this.childProps}/>
      {errors && <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.showError}
        autoHideDuration={6000}
        onClose={() => this.setState({ showError: false })}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<Error errors={errors} />}
      />}
    </>;
  }
}

export default App;
