import React, { Component, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

const STORAGE_KEY = '@PingoStorage:key';

class LoginFacebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }
  componentWillMount() {
    this.getItem();
  }
  async getItem() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(value);
    } catch (error) {
      console.log("componentWillMount" + error.message);
    }
  }
  componentDidMount() {
    console.log("componentDidMount");
    this.loadInitialState().done();
  }

  async loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(value);
      if (value === null){
        if (this.state.token === '') {
          console.log("error: not logged in");
          return;
        }
        await AsyncStorage.setItem(STORAGE_KEY, this.state.token);
        console.log('key set');
      } else {
        console.log('key found: ' + value);
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  };
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
          this.setState({token: data.credentials.token});
          this.loadInitialState().done();
        }}
        onLoginFound={function(e){console.log(e);}}
        onLoginNotFound={function(e){console.log(e);}}
        onLogout={function(e){console.log(e);}}
        onCancel={function(e){console.log(e);}}
        onPermissionsMissing={function(e){console.log(e);}}
      />
    );
  }
}

LoginFacebook.propTypes = {
  buttonView: PropTypes.any.isRequired,
  style: PropTypes.any
};

export default LoginFacebook;
