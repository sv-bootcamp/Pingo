import {Navigator, View, Text} from 'react-native';
import React, {Component} from 'react';
import SceneInitialLayout from './sceneInitialLayout';

export default class AllLayout extends Component {
  constructor(props) {
    super(props);
    this.upperRenderScene = this.upperRenderScene.bind(this);
  }

  render() {
    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={this.upperRenderScene}
      />
    );
  }

  upperRenderScene(route, navigator) {
    switch (route.index) {
    case 0:
      return (
        <SceneInitialLayout
          navigator={navigator}
        />
      );
    case 1:
      return (
        <View>
          <Text>My Page</Text>
        </View>
      );
    default:
      return (
        <View>
          <Text> default </Text>
        </View>
      );
    }
  }
}
