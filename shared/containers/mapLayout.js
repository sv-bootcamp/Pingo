'use strict';

import Map from '../components/map';
import { onLocationChange, getMapMarkers } from '../actions/mapActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentLocation: state.map.currentLocation,
    markers: state.map.markers
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
