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
    this.handleSelectCategoryA = this.handleSelectCategoryA.bind(this);
    this.handleSelectCategoryB = this.handleSelectCategoryB.bind(this);
    this.handleSelectCategoryC = this.handleSelectCategoryC.bind(this);
  }

  handleSelectCategoryA() {
    this.props.update_markers('A');
  }
  handleSelectCategoryB() {
    this.props.update_markers('B');
  }
  handleSelectCategoryC() {
    this.props.update_markers('C');
  }

  render() {
    return (
      <View style={{flexDirection:'row', flex: 1}}>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'green', flex: 1}}
          onPress={this.handleSelectCategoryA}>
          <Text style={styles.text}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'yellow', flex: 1}}
          onPress={this.handleSelectCategoryB}>
          <Text style={styles.text}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 1, backgroundColor: 'red', flex: 1}}
          onPress={this.handleSelectCategoryC}>
          <Text style={styles.text}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={{margin: 1, backgroundColor: 'blue', flex: 1}}
            onPress={this.props.onForward}>
          <Text style={styles.text}>switch</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Headerbox.propTypes = {
  update_markers: PropTypes.func,
  onForward: PropTypes.func
};
