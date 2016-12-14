import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {
  requestRefreshTokenFacebook,
  getAccessToken,
  getRefreshToken,
  removeUserToken,
  grantFacebookUser,
  getLoginType,
  setLoginType,
  removeLoginType,
  signupGuestUser,
  getUserInformation,
  getUserKey
} from '../actions/authActions';
import { Actions } from 'react-native-router-flux';

const WindowHeight = 477.8 + 162;
const WindowWidth = 360;

const styles = {
  settingListBox: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#e7e7e7',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingGreyBox: {
    backgroundColor: '#e7e7e7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fontRobotoRegular: {
    fontFamily: 'Roboto-Regular'
  },
  fontRobotoMedium: {
    fontFamily: 'Roboto-Medium'
  },
  myPageTextLogInFacebook: {
    color: '#2c8cff',
    marginLeft: 16,
    fontSize: 16
  }
};

class LoginFacebook extends Component {
  constructor(props) {
    super(props);
  }
  // todo: since pingo scene does the below work, this may not be necessary
  componentDidMount() {
    if (this.props.currentScene === 'initialScene') {
      getLoginType().then((data) => {
        if (data === 'facebook') {
          getRefreshToken().then((refreshToken) => {
            if (refreshToken === null) {
              return;
            }
            requestRefreshTokenFacebook(refreshToken);
          });
          getAccessToken().then((accessToken) => {
            if (accessToken !== null) {
              this.props.setToken(accessToken);
              this.props.setCurrentScene('map');
              Actions.map({type: 'replace'});
            } else {
              removeLoginType();
            }
          });
        }
      });
    }
  }

  render() {
    return (
      <FBLogin
        buttonView={
          <FBLoginView
            currentScene={this.props.currentScene}
            setCurrentScene={this.props.setCurrentScene}
          />}
        ref={(fbLogin) => {
          this.fbLogin = fbLogin;
        }}
        loginBehavior={FBLoginManager.LoginBehaviors.Web}
        permissions={['email', 'user_about_me']}
        onLogin={(data) => {
          this.props.setLoadingLoginAnimating(true);
          let accessTokenTmp;
          setLoginType('facebook');
          grantFacebookUser(data.credentials.token)
          .then(() => {
            this.props.setToken('facebook');
            this.props.setLoadingLoginAnimating(false);
            if (this.props.currentScene === 'initialScene') {
              this.props.setCurrentScene('map');
              Actions.map({type: 'replace'});
            }
          })
          .then(() => getAccessToken())
          .then((accessToken) => {
            accessTokenTmp = accessToken;
            return getUserKey();
          })
          .then((userKey) => {
            return getUserInformation(userKey, accessTokenTmp);
          })
          .then((rjson) => {
            if (rjson) {
              this.props.setUserName(rjson.name);
              this.props.setUserEmail(rjson.email);
              this.props.setProfileImgUrl(rjson.profileImgUrl);
            }
          })
          .catch(() => this.props.setLoadingLoginAnimating(false));
        }}
        onLoginFound={()=>{}}
        onLoginNotFound={()=>{}}
        onLogout={() => {
          this.props.setToken('');
          removeUserToken()
          .then(() => removeLoginType())
          .then(() => signupGuestUser());
          // todo : handle accessToken for getting items after logout
        }}
        onCancel={()=>{}}
        onPermissionsMissing={()=>{}}
      />
    );
  }
}

class FBLoginView extends Component {
  constructor(props) {
    super(props);
    this.renderButton.bind(this);
    this.handleOnPress.bind(this);
  }

  handleOnPress() {
    if (!this.context.isLoggedIn) {
      this.context.login();
    } else {
      this.context.logout();
    }
  }

  renderButton() {
    if (this.props.currentScene === 'setting') {
      return (
        <View>
          <View style={[styles.settingGreyBox, {height: 16}]}/>
          <TouchableOpacity
            style={[styles.settingListBox, {backgroundColor: 'white'}]}
            onPress={this.handleOnPress.bind(this)}
          >
            <Text style={[styles.myPageTextLogInFacebook, styles.fontRobotoRegular]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.currentScene === 'myPage') {
      return (
        <TouchableOpacity onPress={this.handleOnPress.bind(this)}>
          <Text style={[{color: '#2c8cff'}, styles.fontRobotoRegular]}>
            Log in with Facebook
          </Text>
        </TouchableOpacity>
      );
    } else if (this.props.currentScene === 'initialScene') {
      return (
        <TouchableOpacity
          style={{
            width: Dimensions.get('window').width * 280 / WindowWidth,
            height: Dimensions.get('window').height * 48 / WindowHeight,
            justifyContent: 'center',
            borderRadius: 10,
            elevation: 1,
            backgroundColor: '#4267b2'
          }}
          onPress={() => {
            if (!this.context.isLoggedIn) {
              this.context.login();
            }
            if (this.context.isLoggedIn) {
              this.props.setCurrentScene('map');
              Actions.map({type: 'replace'});
            }
          }}
        >
          <Text style={[{alignSelf: 'center', fontSize: 14, color: 'white'}, styles.fontRobotoMedium]}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    return (
      this.renderButton()
    );
  }
}

FBLoginView.contextTypes = {
  isLoggedIn: React.PropTypes.bool,
  login: React.PropTypes.func,
  logout: React.PropTypes.func,
  props: React.PropTypes.object
};

FBLoginView.propTypes = {
  currentScene: PropTypes.string,
  setCurrentScene: PropTypes.func
};

LoginFacebook.propTypes = {
  style: PropTypes.any,
  setToken: PropTypes.func,
  setUserName: PropTypes.func,
  setUserEmail: PropTypes.func,
  setProfileImgUrl: PropTypes.func,
  setCurrentScene: PropTypes.func,
  setLoadingLoginAnimating: PropTypes.func,
  token: PropTypes.string,
  currentScene: PropTypes.string
};

export default LoginFacebook;
