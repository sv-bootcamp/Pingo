import { connect } from 'react-redux';
import {setCurrentScene} from '../actions/fluxActions';
import SceneMap from '../components/sceneMap';

const mapStateToProps = () => {
  return {
    // todo: add state here if needed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const SceneMapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SceneMap);

export default SceneMapLayout;
