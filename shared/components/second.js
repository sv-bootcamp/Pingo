import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import HeaderLayout from '../containers/headerLayout';
import ListLayout from '../containers/listLayout';

export default class Second extends Component {
  render() {
    return (
      <ListLayout />
    );
  }
}

Second.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any
};
