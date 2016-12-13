import { connect } from 'react-redux';
import { setToken } from '../actions/authActions';
import Pingo from '../components/pingo';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      return dispatch(setToken(token));
    }
  };
};

const PingoLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pingo);

export default PingoLayout;
