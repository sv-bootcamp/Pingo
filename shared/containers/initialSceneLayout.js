import InitialScene from '../components/initialScene';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setToken } from '../actions/authActions';
import { setLoadingLoginAnimating } from '../actions/userActions';

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
    setLoadingLoginAnimating: (loadingLoginAnimating) => {
      return dispatch(setLoadingLoginAnimating(loadingLoginAnimating));
    }
  };
};

const InitialSceneLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScene);

export default InitialSceneLayout;
