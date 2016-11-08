import React, { Component, PropTypes } from 'react';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

class LogInFacebook extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FBLogin
        buttonView={this.props.buttonView}
        ref={(fbLogin) => { this.fbLogin = fbLogin; }}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        permissions={['email', 'user_about_me']}
        onLogin={function(e){console.log(e);}}
        onLoginFound={function(e){console.log(e);}}
        onLoginNotFound={function(e){console.log(e);}}
        onLogout={function(e){console.log(e);}}
        onCancel={function(e){console.log(e);}}
        onPermissionsMissing={function(e){console.log(e);}}
      />
    );
  }
}

LogInFacebook.propTypes = {
  buttonView: PropTypes.any.isRequired,
  style: PropTypes.any
};

export default LogInFacebook;
