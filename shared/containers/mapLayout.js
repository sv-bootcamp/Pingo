'use strict';

import Map from '../components/map';
import { TBD } from '../actions/mapActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    map: state.map
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    TBD: () => {
      return dispatch(TBD());
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
