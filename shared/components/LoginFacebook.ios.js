import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import {
  setLoginType,
  grantFacebookUser,
  removeUserToken,
  removeLoginType
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
  settingTextList: {
    color: '#2b2b2b',
    marginLeft: 16
  },
  settingTextRightButton: {
    fontSize: 16,
    color: '#2c8cff',
    alignSelf: 'flex-end',
    marginRight: 16
  },
  fontRobotoRegular: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  },
  myPageTextLogInFacebook: {
    color: '#2c8cff',
    marginLeft: 16
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
    FBLoginManager.login((error, data) => {
      if (!error) {
        this.props.setLoadingLoginAnimating(true);
        setLoginType('facebook');
        grantFacebookUser(data.credentials.token).then(() => {
          this.props.setToken('facebook');
          console.log(this.props.currentScene);
          this.props.setLoadingLoginAnimating(false);
          if (this.props.currentScene === 'initialScene') {
            this.props.setCurrentScene('map');
            Actions.map({type: 'replace'});
          }
        });
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
        removeUserToken();
        removeLoginType();
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
          <View style={[styles.settingGreyBox, {height: 24}]}/>
          <TouchableOpacity
            style={[styles.settingListBox, {backgroundColor: 'white'}]}
            onPress={this.handleLogout.bind(this)}
          >
            <Text style={[styles.myPageTextLogInFacebook, styles.fontRobotoRegular]}>
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
            elevation: 1,
            backgroundColor: '#4267b2'
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
  token: PropTypes.string,
  currentScene: PropTypes.string
};

export default LoginFacebook;
