import Map from '../components/map';
import { onLocationChange, getMapMarkers, setLocation } from '../actions/mapActions';
import { connect } from 'react-redux';

const getCategorizedMarkers = (markers, categoryFilter) => {
  switch (categoryFilter) {
  case 'SHOW_ALL':
    return markers;
  case 'A':
    return markers.filter(marker => marker.category === 'A');
  case 'B':
    return markers.filter(marker => marker.category === 'B');
  default:
    return markers;
  }
};

const mapStateToProps = (state) => {
  return {
    markers: getCategorizedMarkers(state.map.markers, state.map.categoryFilter),
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
