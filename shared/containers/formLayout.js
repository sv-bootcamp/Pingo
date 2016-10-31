import Create from '../components/Create';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

const mapStateToProps = (state) => {
  return {
    pic: state.form.pic,
    location: state.map.currentLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => {
      return dispatch(true);
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const FormLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);

export default FormLayout;
