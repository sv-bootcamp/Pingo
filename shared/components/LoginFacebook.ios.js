import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import {FBLoginManager} from 'react-native-facebook-login';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    width: 175,
    paddingLeft: 2,

    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 14.2
  },
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5
  },
  FBLoginButtonTextLoggedOut: {
    marginLeft: 18
  },
  FBLogo: {
    position: 'absolute',
    height: 14,
    width: 14,
    left: 7,
    top: 7
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
        this.setState({ user: data });
        this.props.onLogin && this.props.onLogin();
      } else {
        console.log(error, data);
      }
    });
  }

  handleLogout() {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        this.setState({ user : null});
        this.props.onLogout && this.props.onLogout();
      } else {
        console.log(error, data);
      }
    });
  }

  onPress() {
    this.state.user ? this.handleLogout() : this.handleLogin();
    this.props.onPress && this.props.onPress();
  }

  componentWillMount() {
    FBLoginManager.getCredentials((error, data) => {
      if (!error) {
        this.setState({ user: data });
      }
    });
  }

  render() {
    const text = this.state.user ? 'Log out' : 'Log in with Facebook';
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          style={styles.container}
          onPress={this.onPress.bind(this)}
        >
          <View style={styles.FBLoginButton}>
            <Text style={[styles.FBLoginButtonText, this.state.user ? styles.FBLoginButtonTextLoggedIn : styles.FBLoginButtonTextLoggedOut]}
              numberOfLines={1}>{text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

LoginFacebook.propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func
};

export default LoginFacebook