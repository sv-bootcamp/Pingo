import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import MapLayout from '../containers/mapLayout';
import HeaderLayout from '../containers/headerLayout';

export default class First extends Component {
  render() {
    return (
      <MapLayout/>
    );
  }
}

First.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any
};
