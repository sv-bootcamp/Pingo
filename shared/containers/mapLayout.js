'use strict';

import React, {Component} from 'react';
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

export default connect(state => ({
        //TBD
    }),
    (dispatch) => ({
        actions: bindActionCreators(mapActions, dispatch)
    })
)(MapLayout);
