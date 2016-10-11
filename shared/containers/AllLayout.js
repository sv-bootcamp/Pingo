import {Navigator, View} from 'react-native';
import React, {Component} from 'react';
import Second from '../components/second';
import HeaderLayout from './headerLayout';
import FirstLayout from './firstLayout';

export default class AllLayout extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1.25, backgroundColor: 'white'}}>
          <HeaderLayout/>
        </View>
        <View style={{flex: 7}}>
        <Navigator
            initialRoute={{index: 0}}
            renderScene={this.navigatorRenderScene}
        />
        </View>
      </View>
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.index) {
    case 0:
      return (
        <FirstLayout route={route} navigator={navigator}/>
      );
    case 1:
      return (<Second route={route} navigator={navigator}/>);
    default:
      return (<FirstLayout route={route} navigator={navigator}/>);
    }
  }
}

