import {Navigator, View} from 'react-native';
import React, {Component} from 'react';
import First from '../components/first';
import Second from '../components/second';
import HeaderLayout from './headerLayout';

export default class AllLayout extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1.25, backgroundColor: 'white'}}>
          <HeaderLayout
            onForward={this.props.onForward}
          />
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
        <First route={route} navigator={navigator}/>
      );
    case 1:
      return (<Second route={route} navigator={navigator}/>);
    default:
      return (<First route={route} navigator={navigator}/>);
    }
  }
}

