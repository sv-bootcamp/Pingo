import CameraView from '../components/CameraView';
import { setCurrentPic } from '../actions/formActions';
import { setCurrentScene } from '../actions/fluxActions';
import { setUserLocation } from '../actions/mapActions';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    pic: state.form.pic
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentPic: (pic) => {
      return dispatch(setCurrentPic(pic));
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setUserLocation: (userLocation) => {
      return dispatch(setUserLocation(userLocation));
    }
  };
};

const CameraLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(CameraView);

export default CameraLayout;
