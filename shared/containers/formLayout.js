import Create from '../components/Create';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setLoadingLoginAnimating } from '../actions/userActions';

const mapStateToProps = (state) => {
  return {
    pic: state.form.pic,
    zoomLevel: state.map.zoomLevel,
    dataSource: state.list.dataSource,
    currentLocation: state.map.currentLocation,
    userLocation: state.map.userLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => {
      return dispatch(true);
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setLoadingLoginAnimating: (loadingLoginAnimating) => {
      return dispatch(setLoadingLoginAnimating(loadingLoginAnimating));
    }
  };
};

const FormLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

export default FormLayout;
