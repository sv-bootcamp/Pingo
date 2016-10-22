import CameraView from '../components/CameraView';
import { setCurrentPic } from '../actions/formActions';
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
    }
  };
};

const CameraLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(CameraView);

export default CameraLayout;
