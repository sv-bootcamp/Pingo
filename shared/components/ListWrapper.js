import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
// import Card from './Card.js';
import EventList from './EventList.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

class ListWrapper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EventList />
      </View>
    );
  }
}

export default ListWrapper;
