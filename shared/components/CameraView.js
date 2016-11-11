import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

import ImgBtnClose from '../resources/camera/btn_close.png';
import ImgCameraSwitch from '../resources/camera/icon_camera_switch.png';
import ImgBtnTakingPhoto from '../resources/camera/btn_taking_photo.png';
import ImgFlash from '../resources/camera/icon_flash.png';
import ImgCameraAgain from '../resources/camera/icon_camera_again.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    left: 0,
    top: 67
  },
  top: {
    height: 67,
    width: Dimensions.get('window').width,
    backgroundColor: '#2b2b2b',
    position: 'absolute',
    left: 0,
    top: 0
  },
  bottom: {
    height: 573 - 360,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: '#2b2b2b',
    position: 'absolute',
    bottom: 0
  },
  btn_taking_photo: {
    alignSelf: 'center',
    flex: 1
  },
  btn_camera_switch: {
    alignSelf: 'center',
    flex: 1
  },
  btn_flash: {
    alignSelf: 'center',
    flex: 1
  },
  btn_again: {
    alignSelf: 'center',
    left: Dimensions.get('window').width / 2 - 25
  },
  btn_close: {
    left: 15,
    top: 24
  },
  btn_use: {
    left: Dimensions.get('window').width - 50,
    top: -22
  },
  text_top: {
    alignSelf: 'center',
    flex: 1,
    color: 'white',
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_use: {
    color: '#2c8cff',
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  }
});

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
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // todo: determine what to do here
        console.log(position);
      },
      (error) => {
        // todo: implement what to do when GPS is off
        console.log(error);
        this.props.setCurrentScene('map');
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
    //todo: handle camera flash here
  }

  handleClose() {
    this.props.setCurrentScene(this.props.lastScene);
    Actions.pop();
  }

  handleUse() {
    Actions.createForm();
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
        style={styles.btn_close}
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
          style={styles.btn_use}
          onPress={this.handleUse.bind(this)}>
          <Text style={styles.text_use}> Use </Text>
        </TouchableOpacity>
      : null
    );
  }

  renderCameraOrAfter() {
    return (
      (this.state.Done === true) ?
        <Image source={{uri: this.props.pic}} style={styles.preview} />
      :
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
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
          style={styles.btn_camera_switch}
          onPress={this.switchType.bind(this)}>
          <Image
            style={{height: 48, width: 48, left: 32}}
            source={ImgCameraSwitch}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_taking_photo}
          onPress={this.takePicture.bind(this)}>
          <Image
            style={{
              height: 80, width: 80,
              left: Dimensions.get('window').width / 6 - 40}}
            source={ImgBtnTakingPhoto}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_flash}
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
          style={styles.btn_again}
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
          <Text style={styles.text_top}> Photo </Text>
          {this.renderBtnUse()}
        </View>
        {this.renderCameraOrAfter()}
        {(this.state.Done === true) ?
          <View>{this.renderBottomAfter()}</View> :
          <View>{this.renderBottom()}</View>
        }
      </View>
    );
  }
}

CameraView.propTypes = {
  setCurrentPic: PropTypes.func,
  setCurrentScene: PropTypes.func,
  pic: PropTypes.string,
  lastScene: PropTypes.string
};

export default CameraView;
