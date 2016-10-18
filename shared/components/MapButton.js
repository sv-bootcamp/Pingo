import React, {PropTypes, Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';

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
    return (
    <View>
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.setCurrentPosition}>
        <View>
          <Text>Button!</Text>
        </View>
      </TouchableHighlight>
    </View>
    );
  }
}

MapButton.propTypes = {
  setCurrentPosition: PropTypes.func
};
