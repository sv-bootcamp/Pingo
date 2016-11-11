import InitialScene from '../components/initialScene';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const InitialSceneLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScene);

export default InitialSceneLayout;
