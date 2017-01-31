import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setToken } from '../actions/authActions';
import Pingo from '../components/pingo';
import { setLocation } from '../actions/mapActions';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setToken: (token) => {
      return dispatch(setToken(token));
    },
    setLocation: (location) => {
      return dispatch(setLocation(location));
    }
  };
};

const PingoLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pingo);

export default PingoLayout;
