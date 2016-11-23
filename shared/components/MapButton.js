import React, {PropTypes, Component} from 'react';
import {TouchableOpacity, Image, View, Platform} from 'react-native';
import ImgBtnLocation from '../resources/btn_location/btn_location.png';
import ImgBtnCamera from '../resources/btn_camera/btn_camera.png';

const styles = {
  container: {
    height: 48,
    width: 48,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowRadius: 2
      }
    })
  },
  position: {
    backgroundColor: '#f7f7f9',
    height: 48,
    width: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    backgroundColor: '#1e1e1e',
    height: 48,
    width: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default class MapButton extends Component {
  render() {
    const imageSource = (this.props.imageSource === 'position') ? ImgBtnLocation : ImgBtnCamera;

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={[(this.props.imageSource === 'position') ? styles.position : styles.camera]}
          onPress={this.props.handleOnPress}>
          <View>
            <Image
              style={{height: 24, width: 24}}
              source={imageSource} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MapButton.propTypes = {
  handleOnPress: PropTypes.func,
  imageSource: PropTypes.string,
  style: PropTypes.any
};
