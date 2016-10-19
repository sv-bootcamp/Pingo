import React, {PropTypes, Component} from 'react';
import {TouchableHighlight, Image, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  position: {
    backgroundColor: '#f7f7f9',
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    backgroundColor: '#1e1e1e',
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class MapButton extends Component {
  render() {
    const imageSource = (this.props.imageSource === 'position') ?
    require('../resources/btn_location/drawable-mdpi/btn_location.png') :
    require('../resources/btn_camera/drawable-mdpi/btn_camera.png');

    return (
    <View>
      <TouchableHighlight
        style={(this.props.imageSource === 'position') ? styles.position : styles.camera}
        onPress={this.props.handleOnPress}>
        <View>
          <Image
            source={imageSource} />
        </View>
      </TouchableHighlight>
    </View>
    );
  }
}

MapButton.propTypes = {
  handleOnPress: PropTypes.func,
  imageSource: PropTypes.string
};
