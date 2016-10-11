import { connect } from 'react-redux';
import {updateMarkers} from '../actions/mapActions';
import Headerbox from '../components/headerbox';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMarkers: (select) => {
      return dispatch(updateMarkers(select));
    }
  };
};

const HeaderLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Headerbox);

export default HeaderLayout;
