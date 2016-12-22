import { View, StyleSheet, Platform, BackAndroid, ToastAndroid} from 'react-native';
import React, { Component, PropTypes } from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import HeaderLayout from './headerLayout';
import FormLayout from './formLayout';
import CameraLayout from './cameraLayout';
import MapLayout from './mapLayout';
import ListLayout from './listLayout';
import DetailViewLayout from './detailViewLayout';
import MyPageLayout from './myPageLayout';
import SettingLayout from './settingLayout';
import EventReportView from '../components/eventReportView';
import InitialSceneLayout from './initialSceneLayout';
import PingoLayout from './pingoLayout';
import PrivacyPolicyLayout from './privacyPolicyLayout';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="pingo" hideNavBar={true} panHandlers={null} component={
      PingoLayout
    }/>
    <Scene key="map" hideNavBar={true} panHandlers={null} component={
      MapLayout
    }/>
    <Scene key="initialScene" hideNavBar={true} panHandlers={null} component={
      InitialSceneLayout
    }/>
    <Scene key="list" hideNavBar={true} panHandlers={null} component={
      ListLayout
    }/>
    <Scene key="createForm" hideNavBar={true} panHandlers={null} component={
      FormLayout
    }/>
    <Scene key="cameraView" hideNavBar={true} panHandlers={null} component={
      CameraLayout
    }/>
    <Scene key="detailView" hideNavBar={true} panHandlers={null} component={
      DetailViewLayout
    }/>
    <Scene key="myPage" hideNavBar={true} panHandlers={null} component={
      MyPageLayout
    }/>
    <Scene key="setting" hideNavBar={true} panHandlers={null} component={
      SettingLayout
    }/>
    <Scene key="eventReportView" hideNavBar={true} panHandlers={null} component={
      EventReportView
    }/>
    <Scene key="privacyPolicy" hideNavBar={true} panHandlers={null} component={
      PrivacyPolicyLayout
    }/>
  </Scene>
);

const styles = StyleSheet.create({
  iosMargin: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 19,
        overflow: 'hidden'
      }
    })
  }
});

let prevAndroidExitBtnClickTime = new Date().getTime();
const ANDROID_EXIT = {
  CLICK_TERM: 2000,
  MESSAGE: 'Touch again. If you want to leave.',
  MESSAGE_DURATION: ToastAndroid.SHORT
};

class All extends Component {
  constructor(props) {
    super(props);
  }

  backAndroidHandler() {
    if (this.props.currentScene === 'list') {
      this.props.setCurrentScene('map');
      Actions.pop();
    } else if (this.props.currentScene === 'map') {
      const currentTime = new Date().getTime();
      if (currentTime - prevAndroidExitBtnClickTime > ANDROID_EXIT.CLICK_TERM) {
        prevAndroidExitBtnClickTime = currentTime;
        ToastAndroid.show(ANDROID_EXIT.MESSAGE, ANDROID_EXIT.MESSAGE_DURATION);
      } else {
        BackAndroid.exitApp();
      }
    } else if (this.props.currentScene === 'cameraView') {
      // todo: change the following to know the prev scene
      this.props.setCurrentScene('map');
      Actions.pop();
    } else if (this.props.currentScene === 'createForm') {
      Actions.pop({popNum: 2});
    } else if (this.props.currentScene === 'myPage') {
      this.props.setCurrentScene('map');
      Actions.map({type: 'replace'});
    } else if (this.props.currentScene === 'setting') {
      this.props.setCurrentScene('myPage');
      Actions.myPage({type: 'replace'});
    } else if (this.props.currentScene === 'DetailView') {
      Actions.pop();
    } else if (this.props.currentScene === 'privacyPolicy') {
      this.props.setCurrentScene('setting');
      Actions.pop();
    }
    return true;
  }

  render() {
    return (
      <View style={styles.iosMargin}>
          <HeaderLayout/>
        <View style={{flex: 1}}>
          <Router
            scenes={scenes}
            backAndroidHandler={() => this.backAndroidHandler()}
          />
        </View>
      </View>
    );
  }
}

All.propTypes = {
  currentScene: PropTypes.string,
  setCurrentScene: PropTypes.func
};

function mapStateToProps(state) {
  return { currentScene: state.flux.currentScene };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const AllLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(All);

export default AllLayout;
