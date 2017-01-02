import Create from '../components/create';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setLoadingLoginAnimating } from '../actions/userActions';
import { needUpdate, setPostedKey, setPostedUri } from '../actions/listActions';
import { requestAddItem } from '../actions/formActions';

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
    needUpdate: (zoomLevel, lat, long) => {
      return dispatch(needUpdate(zoomLevel, lat, long));
    },
    setPostedKey: (itemKey) => {
      return dispatch(setPostedKey(itemKey));
    },
    setPostedUri: (uri) => {
      return dispatch(setPostedUri(uri));
    },
    requestAddItem: (body) => {
      return dispatch(requestAddItem(body));
    }
  };
};

const FormLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

export default FormLayout;
