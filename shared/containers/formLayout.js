import CreateForm from '../components/CreateForm';
import { connect } from 'react-redux';

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
    }
  };
};

const FormLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);

export default FormLayout;
