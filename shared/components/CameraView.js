import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    height: 360,
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
  bottom_buttons: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'blue',
    width: Dimensions.get('window').width
  },
  btn_taking_photo: {
    alignSelf: 'center',
    left: Dimensions.get('window').width / 2 - 90
  },
  btn_camera_switch: {
    alignSelf: 'center',
    left: 32
  },
  btn_flash: {
    alignSelf: 'center',
    left: Dimensions.get('window').width / 2 - 32
  }
});

class CameraView extends Component {
  takePicture() {
    this.camera.capture()
    .then((data) => {
      this.props.setCurrentPic(data.path);
      Actions.createForm({type: 'replace'});
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={{color: 'white'}}> Photo </Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}/>
      <View style={styles.bottom}>
          <TouchableOpacity
              style={styles.btn_camera_switch}
              onPress={()=>{}}>
            <Image
                style={{height: 48, width: 48}}
                source={require('../resources/camera/icon_camera_switch.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_taking_photo}
            onPress={this.takePicture.bind(this)}>
            <Image
              style={{height: 80, width: 80}}
              source={require('../resources/camera/btn_taking_photo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_flash}
            onPress={()=>{}}>
            <Image
              style={{height: 48, width: 48}}
              source={require('../resources/camera/icon_flash.png')}
            />
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}

CameraView.propTypes = {
  setCurrentPic: PropTypes.func
};

export default CameraView;
