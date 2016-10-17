import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
};

export default class ImageSwiper extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons height= {100} >
        <View style={styles.slide1}>
          <Text style={styles.text}>Image1</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Image2</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Image3</Text>
        </View>
      </Swiper>
    );
  }
}
