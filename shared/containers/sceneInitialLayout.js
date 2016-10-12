import { connect } from 'react-redux';
import {setMyPageNavigator} from '../actions/navigatorActions';
import SceneInitial from '../components/sceneInitial';

const mapStateToProps = () => {
  return {
    // add state here if needed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNavigator: (navigator) => {
      return dispatch(setMyPageNavigator(navigator));
    }
  };
};

const sceneInitialLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SceneInitial);

export default sceneInitialLayout;
