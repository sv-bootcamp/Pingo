import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default class Headerbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flexDirection:'row', flex: 1}}>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'green', flex: 1}}
          onPress={this.props.update_markers_A}>
          <Text style={styles.text}>Click!!!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'yellow', flex: 1}}
          onPress={this.props.update_markers_B}>
          <Text style={styles.text}>Click!!!!!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'red', flex: 1}}
          onPress={this.props.update_markers_C}>
          <Text style={styles.text}>Click!!!!!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Headerbox.propTypes = {
  update_markers_A: PropTypes.func,
  update_markers_B: PropTypes.func,
  update_markers_C: PropTypes.func
};
