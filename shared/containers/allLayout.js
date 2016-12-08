import { View, StyleSheet, Platform } from 'react-native';
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
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="pingo" hideNavBar={true} component={
      PingoLayout
    }/>
    <Scene key="map" hideNavBar={true} component={
      MapLayout
    }/>
    <Scene key="initialScene" hideNavBar={true} component={
      InitialSceneLayout
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
    <Scene key="setting" hideNavBar={true} component={
      SettingLayout
    }/>
    <Scene key="eventReportView" hideNavBar={true} component={
      EventReportView
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

class All extends Component {
  constructor(props) {
    super(props);
  }

  backAndroidHandler() {
    if (this.props.currentScene === 'list') {
      this.props.setCurrentScene('map');
      Actions.pop();
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
