import LoginFacebook from '../components/LoginFacebook';
import { connect } from 'react-redux';
import { setToken } from '../actions/authActions';

// todo: change items later
const mapStateToProps = (state) => {
  return {
    token: state.auth.token
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
