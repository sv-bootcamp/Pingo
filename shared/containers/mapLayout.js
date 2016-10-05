'use strict';

import Map from '../components/map';
import { onLocationChange } from '../actions/mapActions';
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
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
