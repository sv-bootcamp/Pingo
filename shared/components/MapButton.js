import React, {PropTypes, Component} from 'react';
import {TouchableHighlight, TouchableNativeFeedback, Platform, Text, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f7f7f9',
    height: 30,
    width: 30
  }
});

export default class MapButton extends Component {
  buttonClicked() {
    console.log('Bro is clicked');
  }

  render() {
    let TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
    }
    return (
    <View>
      <TouchableElement
        style={styles.button}
        onPress={this.props.setCurrentPosition}>
        <View>
          <Text>Button!</Text>
        </View>
      </TouchableElement>        
    </View>
    );
  }
}

MapButton.propTypes = {
  setCurrentPosition: PropTypes.func
};
