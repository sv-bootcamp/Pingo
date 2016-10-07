import MapLayout from './mapLayout';
import HeaderLayout from './headerLayout';
import {View} from 'react-native';
import React, {Component} from 'react';

export default class AllLayout extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderLayout />
        </View>
        <View style={{flex: 7}}>
          <MapLayout />
        </View>
      </View>
    );
  }
}

