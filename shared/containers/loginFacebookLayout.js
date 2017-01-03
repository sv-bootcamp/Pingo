import LoginFacebook from '../components/loginFacebook';
import { connect } from 'react-redux';
import { setToken } from '../actions/authActions';
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
