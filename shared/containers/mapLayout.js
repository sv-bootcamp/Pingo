'use strict';

import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import Map from '../components/map';
import * as mapActions from '../actions/mapActions';
import { connect } from 'react-redux';


class MapLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <Map
        {...actions} />
    );
  }
}

MapLayout.propTypes = {
  actions: PropTypes.any
};

MapLayout.defaultProps = {

};

export default connect(() => ({
        // TBD
}),
  (dispatch) => ({
    actions: bindActionCreators(mapActions, dispatch)
  })
)(MapLayout);
