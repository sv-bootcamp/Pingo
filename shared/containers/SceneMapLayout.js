import { connect } from 'react-redux';
import {setRoute, setNavigator} from '../actions/navigatorActions';
import SceneMap from '../components/sceneMap';

const mapStateToProps = () => {
  return {
    // todo: add state here if needed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (state) => {
      return dispatch(setRoute(state));
    },
    setNavigator: (navigator) => {
      return dispatch(setNavigator(navigator));
    }
  }
};

const SceneMapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SceneMap);

export default SceneMapLayout;