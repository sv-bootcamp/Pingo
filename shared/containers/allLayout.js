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
import PrivacyPolicyLayout from './privacyPolicyLayout';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

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
            backAndroidHandler={() => this.backAndroidHandler()}
          >
            <Scene key={SCENE_KEY.ROOT} hideNavBar={true}>
              {SCENE_PROPS.map(props => <Scene {...props}/>)}
            </Scene>
          </Router>
        </View>
      </View>
    );
  }
}

export const SCENE_KEY = {
  ROOT: 'root',
  PINGO: 'pingo',
  MAP: 'map',
  INITIAL: 'initialScene',
  LIST: 'list',
  CREATE_FORM: 'createForm',
  CAMERA_VIEW: 'cameraView',
  DETAIL_VIEW: 'detailView',
  MY_PAGE: 'myPage',
  SETTING: 'setting',
  EVENT_REPORT_VIEW: 'eventReportView',
  PRIVACY_POLICY: 'privacyPolicy'
};

const SCENE_PROPS = [
  {
    key: SCENE_KEY.PINGO,
    hideNavBar: true,
    component: PingoLayout
  },
  {
    key: SCENE_KEY.MAP,
    hideNavBar: true,
    component: MapLayout
  },
  {
    key: SCENE_KEY.INITIAL,
    hideNavBar: true,
    component: InitialSceneLayout
  },
  {
    key: SCENE_KEY.LIST,
    hideNavBar: true,
    component: ListLayout
  },
  {
    key: SCENE_KEY.CREATE_FORM,
    hideNavBar: true,
    component: FormLayout
  },
  {
    key: SCENE_KEY.CAMERA_VIEW,
    hideNavBar: true,
    component: CameraLayout
  },
  {
    key: SCENE_KEY.DETAIL_VIEW,
    hideNavBar: true,
    component: DetailViewLayout
  },
  {
    key: SCENE_KEY.MY_PAGE,
    hideNavBar: true,
    component: MyPageLayout
  },
  {
    key: SCENE_KEY.SETTING,
    hideNavBar: true,
    component: SettingLayout
  },
  {
    key: SCENE_KEY.EVENT_REPORT_VIEW,
    hideNavBar: true,
    component: EventReportView
  },
  {
    key: SCENE_KEY.PRIVACY_POLICY,
    hideNavBar: true,
    component: PrivacyPolicyLayout
  }
];


All.propTypes = {
  currentScene: PropTypes.string,
  setCurrentScene: PropTypes.func
};

const initScenes = () => {
  return SCENE_PROPS.map(props => <Scene {...props}/>);
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
