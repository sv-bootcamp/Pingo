import React, { Component, PropTypes } from 'react';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import { setUserToken, removeUserToken } from '../actions/authActions';

class LoginFacebook extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FBLogin
        buttonView={this.props.buttonView}
        ref={(fbLogin) => {
          this.fbLogin = fbLogin;
        }}
        loginBehavior={FBLoginManager.LoginBehaviors.Web}
        permissions={['email', 'user_about_me']}
        onLogin={(data) => {
          this.props.setToken(data.credentials.token);
          setUserToken(data.credentials.token);
        }}
        onLoginFound={()=>{}}
        onLoginNotFound={()=>{}}
        onLogout={() => {
          this.props.setToken('');
          removeUserToken();
        }}
        onCancel={()=>{}}
        onPermissionsMissing={()=>{}}
      />
    );
  }
}

LoginFacebook.propTypes = {
  buttonView: PropTypes.any.isRequired,
  style: PropTypes.any,
  setToken: PropTypes.func,
  token: PropTypes.string
};

export default LoginFacebook;
