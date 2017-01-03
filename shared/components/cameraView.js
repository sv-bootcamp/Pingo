import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import {SCENE_KEY} from '../containers/allLayout';
import ImgBtnClose from '../resources/camera/btn_close.png';
import ImgCameraSwitch from '../resources/camera/icon_camera_switch.png';
import ImgBtnTakingPhoto from '../resources/camera/btn_taking_photo.png';
import ImgFlash from '../resources/camera/icon_flash.png';
import ImgCameraAgain from '../resources/camera/icon_camera_again.png';

const styles = {
  container: {
    flex: 1
  },
  top: {
    flex: 67,
    backgroundColor: '#2b2b2b'
  },
  bottom: {
    flex: 573 - 360,
    flexDirection: 'row',
    backgroundColor: '#2b2b2b'
  },
  btnTakingPhoto: {
    alignSelf: 'center',
    flex: 1
  },
  btnCameraSwitch: {
    alignSelf: 'center',
    flex: 1
  },
  btnFlash: {
    alignSelf: 'center',
    flex: 1
  },
  btnAgain: {
    alignSelf: 'center',
    left: Dimensions.get('window').width / 2 - 25
  },
  btnClose: {
    left: 15,
    top: 24,
    width: 24
  },
  btnUse: {
    left: Dimensions.get('window').width - 50,
    top: -22
  },
  textTop: {
    alignSelf: 'center',
    flex: 1,
    color: 'white',
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  },
  textUse: {
    color: '#2c8cff',
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  }
};

class CameraView extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        captureAudio: false
      },
      isRecording: false,
      Done: false
    };
    this.props.setCurrentScene(SCENE_KEY.CAMERA_VIEW);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.props.setUserLocation(userLocation);
      },
      (error) => {
        // todo: implement what to do when GPS is off
        console.log(error);
        Actions.pop();
      });
  }

  takePicture() {
    this.camera.capture()
    .then((data) => {
      this.props.setCurrentPic(data.path);
      this.setState({
        Done: true
      });
      Actions.refresh();
    })
    .catch(err => console.error(err));
  }

  takeAgain() {
    this.setState({
      Done: false
    });
    Actions.refresh();
  }

  handleFlash() {
    // todo: handle camera flash here
  }

  handleClose() {
    Actions.pop();
  }

  handleUse() {
    Actions.createForm({lastScene: this.props.lastScene});
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      }
    });
  }

  renderBtnClose() {
    return (
      <TouchableOpacity
        style={styles.btnClose}
        onPress={this.handleClose.bind(this)}>
        <Image
          style={{height: 24, width: 24}}
          source={ImgBtnClose}
        />
      </TouchableOpacity>
    );
  }

  renderBtnUse() {
    return (
      (this.state.Done === true) ?
        <TouchableOpacity
          style={styles.btnUse}
          onPress={this.handleUse.bind(this)}>
          <Text style={styles.textUse}> Use </Text>
        </TouchableOpacity>
      : null
    );
  }

  renderCameraOrAfter() {
    return (
      (this.state.Done === true) ?
        <Image source={{uri: this.props.pic}} style={{flex: 1}} />
      :
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={{flex: 1}}
          type={this.state.camera.type}
          aspect={this.state.camera.aspect}
          flashMode={this.state.camera.flashMode}
          captureTarget={this.state.camera.captureTarget}
          orientation={this.state.camera.orientation}
          captureAudio={this.state.camera.captureAudio}
        />
    );
  }

  renderBottom() {
    return (
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btnCameraSwitch}
          onPress={this.switchType.bind(this)}>
          <Image
            style={{height: 48, width: 48, left: 32}}
            source={ImgCameraSwitch}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnTakingPhoto}
          onPress={this.takePicture.bind(this)}>
          <Image
            style={{
              height: 80, width: 80,
              left: Dimensions.get('window').width / 6 - 40}}
            source={ImgBtnTakingPhoto}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFlash}
          onPress={this.handleFlash.bind(this)}>
          <Image
            style={{
              height: 48, width: 48,
              left: Dimensions.get('window').width / 3 - 48 - 32}}
            source={ImgFlash}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderBottomAfter() {
    return (
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btnAgain}
          onPress={this.takeAgain.bind(this)}>
          <Image
            style={{height: 48, width: 48}}
            source={ImgCameraAgain}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this.renderBtnClose()}
          <Text style={styles.textTop}> Photo </Text>
          {this.renderBtnUse()}
        </View>
        <View style={{flex: 360}}>
          {this.renderCameraOrAfter()}
        </View>
        {(this.state.Done === true) ?
          <View style={{flex: 213}}>{this.renderBottomAfter()}</View> :
          <View style={{flex: 213}}>{this.renderBottom()}</View>
        }
      </View>
    );
  }
}

CameraView.propTypes = {
  setCurrentPic: PropTypes.func,
  setCurrentScene: PropTypes.func,
  setUserLocation: PropTypes.func,
  pic: PropTypes.string,
  lastScene: PropTypes.string
};

export default CameraView;
