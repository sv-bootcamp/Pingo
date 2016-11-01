import Create from '../components/Create';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    pic: state.form.pic,
    zoomLevel: state.map.zoomLevel,
    dataSource: state.list.dataSource,
    currentLocation: state.map.currentLocation
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
)(Create);

export default FormLayout;
