import {Navigator} from 'react-native';
import React, {Component} from 'react';
import First from './first';
import Second from './second';

export default class AllLayout extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={this.navigatorRenderScene}
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.index) {
    case 0:
      return (<First route={route} navigator={navigator}/>);
    case 1:
      return (<Second route={route} navigator={navigator}/>);
    default:
      return (<First route={route} navigator={navigator}/>);
    }
  }
}

