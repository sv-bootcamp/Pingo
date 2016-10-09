import Map from '../components/map';
import { onLocationChange, getMapMarkers, setLocation } from '../actions/mapActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    markers: state.map.markers,
    category: state.map.category,
    currentLocation: state.map.currentLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationChange: (region) => {
      return dispatch(onLocationChange(region));
    },
    getMapMarkers: () => {
      return dispatch(getMapMarkers());
    },
    setLocation: (location) => {
      return dispatch(setLocation(location));
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
