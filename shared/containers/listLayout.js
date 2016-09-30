'use strict';

import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import ListWrapper from '../components/ListWrapper';
import * as listActions from '../actions/listActions';
import { connect } from 'react-redux';

class ListLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { actions } = this.props;
    return (
      <ListWrapper
        {...actions} />
    );
  }
}

ListLayout.propTypes = {
  actions: PropTypes.any
};

ListLayout.defaultProps = {

};

export default connect(() => ({
        // TBD
}),
  (dispatch) => ({
    actions: bindActionCreators(listActions, dispatch)
  })
)(ListLayout);
