import LoginFacebook from '../components/LoginFacebook';
import { connect } from 'react-redux';
import { setToken } from '../actions/authActions';

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
    }
  };
};

const LoginFacebookLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFacebook);

export default LoginFacebookLayout;
