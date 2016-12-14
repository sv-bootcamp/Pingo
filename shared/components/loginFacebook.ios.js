import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import {
  setLoginType,
  grantFacebookUser,
  removeUserToken,
  removeLoginType,
  signupGuestUser,
  getUserInformation,
  getUserKey,
  getAccessToken
} from '../actions/authActions';

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
  fontRobotoMedium: {
    fontWeight: 'bold'
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
    this.state = {
      user: ''
    };
  }

  handleLogin() {
    FBLoginManager.loginWithPermissions(['email', 'user_about_me'], (error, data) => {
      if (!error) {
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
      } else {
        this.props.setLoadingLoginAnimating(false);
        console.log(error, data);
      }
    });
  }

  handleLogout() {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        this.props.setToken('');
        removeUserToken()
        .then(() => removeLoginType())
        .then(() => signupGuestUser());
      } else {
        console.log(error, data);
      }
    });
  }

  onPress() {
    this.state.user ? this.handleLogout() : this.handleLogin();
  }

  componentWillMount() {
    FBLoginManager.getCredentials((error, data) => {
      if (!error) {
        this.setState({ user: data });
      }
    });
  }

  renderButton() {
    if (this.props.currentScene === 'setting') {
      return (
        <View>
          <View style={[styles.settingGreyBox, {height: 16}]}/>
          <TouchableOpacity
            style={[styles.settingListBox, {backgroundColor: 'white'}]}
            onPress={this.handleLogout.bind(this)}
          >
            <Text style={styles.myPageTextLogInFacebook}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.currentScene === 'myPage') {
      return (
        <TouchableOpacity onPress={this.handleLogin.bind(this)}>
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
            backgroundColor: '#4267b2',
            shadowOpacity: 0.2,
            shadowRadius: 1,
            shadowOffset: {
              width: 0,
              height: 3
            }
          }}
          onPress={this.handleLogin.bind(this)}
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

LoginFacebook.propTypes = {
  style: PropTypes.any,
  setToken: PropTypes.func,
  setCurrentScene: PropTypes.func,
  setLoadingLoginAnimating: PropTypes.func,
  setUserName: PropTypes.func,
  setUserEmail: PropTypes.func,
  setProfileImgUrl: PropTypes.func,
  token: PropTypes.string,
  currentScene: PropTypes.string
};

export default LoginFacebook;
