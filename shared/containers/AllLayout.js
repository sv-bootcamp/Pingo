import {View, StyleSheet, Platform} from 'react-native';
import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import HeaderLayout from './headerLayout';
import FormLayout from './formLayout';
import CameraLayout from './cameraLayout';
import MapLayout from './mapLayout';
import ListLayout from './listLayout';
import DetailViewLayout from './detailViewLayout';
import MyPageLayout from './myPageLayout';
import LogInFacebook from '../components/LogInFacebook';
import SettingLayout from './settingLayout';
import InitialSceneLayout from './InitialSceneLayout';

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="initialScene" hideNavBar={true} component={
      InitialSceneLayout
    }/>
    <Scene key="map" hideNavBar={true} component={
      MapLayout
    }/>
    <Scene key="list" hideNavBar={true} component={
      ListLayout
    }/>
    <Scene key="createForm" hideNavBar={true} component={
      FormLayout
    }/>
    <Scene key="cameraView" hideNavBar={true} component={
      CameraLayout
    }/>
    <Scene key="detailView" hideNavBar={true} component={
      DetailViewLayout
    }/>
    <Scene key="myPage" hideNavBar={true} component={
      MyPageLayout
    }/>
    <Scene key="logInFacebook" hideNavBar={true} component={
      LogInFacebook
    }/>
    <Scene key="setting" hideNavBar={true} component={
      SettingLayout
    }/>
  </Scene>
);

const styles = StyleSheet.create({
  iosMargin: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 19
      }
    })
  }
});

export default class AllLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.iosMargin}>
          <HeaderLayout/>
        <View style={{flex: 1}}>
          <Router
            scenes={scenes}
          />
        </View>
      </View>
    );
  }
}
