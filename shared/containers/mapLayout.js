import Map from '../components/map';
import { onLocationChange, getMapMarkers } from '../actions/mapActions';
import { connect } from 'react-redux';
import {do_smt} from '../actions/mapActions';

const mapStateToProps = (state) => {
  return {
    currentLocation: state.map.currentLocation,
    markers: state.map.markers,
    category: state.map.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationChange: (region) => {
      return dispatch(onLocationChange(region));
    },
    getMapMarkers: () => {
      return dispatch(getMapMarkers());
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
