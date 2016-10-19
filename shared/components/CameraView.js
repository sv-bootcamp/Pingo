import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

class CameraView extends Component {
  takePicture() {
    this.camera.capture()
    .then((data) => { 
      console.log(data.path);
      Actions.createForm();
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
    <View style={styles.container}>
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        captureTarget={Camera.constants.CaptureTarget.disk}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture}
          onPress={this.takePicture.bind(this)}>[[CAPTURE]]</Text>
      </Camera>
    </View>
  );
  }
}

export default CameraView;
