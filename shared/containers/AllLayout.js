import {View} from 'react-native';
import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import HeaderLayout from './headerLayout';
import SceneListLayout from './sceneListLayout';
import SceneMapLayout from './SceneMapLayout';
import CreateForm from '../components/CreateForm';
import CameraView from '../components/CameraView';

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="map" hideNavBar={true} component={
      SceneMapLayout
    }/>
    <Scene key="list" hideNavBar={true} component={
      SceneListLayout
    }/>
    <Scene key="createForm" hideNavBar={true} component={
      CreateForm
    }/>
    <Scene key="cameraView" hideNavBar={true} component={
      CameraView
    }/>
  </Scene>
);

export default class AllLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <HeaderLayout/>
        <View style={{flex: 4}}>
          <Router
            scenes={scenes}
          />
        </View>
      </View>
    );
  }
}