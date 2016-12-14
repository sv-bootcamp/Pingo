import Create from '../components/create';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setLoadingLoginAnimating } from '../actions/userActions';
import { needUpdate, setPostedKey, setPostedUri } from '../actions/listActions';

const mapStateToProps = (state) => {
  return {
    pic: state.form.pic,
    zoomLevel: state.map.zoomLevel,
    dataSource: state.map.items,
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
    },
    needUpdate: () => {
      return dispatch(needUpdate());
    },
    setPostedKey: (itemKey) => {
      return dispatch(setPostedKey(itemKey));
    },
    setPostedUri: (uri) => {
      return dispatch(setPostedUri(uri));
    }
  };
};

const FormLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

export default FormLayout;
