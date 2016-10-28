import React, {
  Component, PropTypes
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
    width: Dimensions.get('window').width,
    backgroundColor: '#2b2b2b',
    position: 'absolute',
    bottom: 0
  }
});

//height: Dimensions.get('window').height,
//width: Dimensions.get('window').width

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
          <Text> PHOOTTOO </Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        <Text> asdfasdfsafsdafsdafs </Text>
      </Camera>
      <View style={styles.bottom}>
      </View>
      </View>
    );
  }
}

CameraView.propTypes = {
  setCurrentPic: PropTypes.func
};

export default CameraView;
