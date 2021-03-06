import LoginFacebook from '../components/loginFacebook';
import { connect } from 'react-redux';
import {
  setToken,
  setUserName,
  setUserEmail,
  setProfileImgUrl
} from '../actions/authActions';
import { setCurrentScene } from '../actions/fluxActions';
import { setLoadingLoginAnimating } from '../actions/userActions';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    currentScene: state.flux.currentScene
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      return dispatch(setToken(token));
    },
    setUserName: (userName) => {
      return dispatch(setUserName(userName));
    },
    setUserEmail: (userEmail) => {
      return dispatch(setUserEmail(userEmail));
    },
    setProfileImgUrl: (profileImgUrl) => {
      return dispatch(setProfileImgUrl(profileImgUrl));
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setLoadingLoginAnimating: (loadingLoginAnimating) => {
      return dispatch(setLoadingLoginAnimating(loadingLoginAnimating));
    }
  };
};

const LoginFacebookLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFacebook);

export default LoginFacebookLayout;
