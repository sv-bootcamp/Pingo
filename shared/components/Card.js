import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageSwiper from './ImageSwiper';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f7f7f9',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  title: {
    flex: 2,
    fontSize: 20,
    margin: 10
  },
  address: {
    flex: 1,
    fontSize: 16
  }
});

class Card extends Component {
  render() {
    if (this.props.cardVisible) {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.address}>{this.props.address}</Text>
          <ImageSwiper/>
        </View>
      );
    }
    return (
      <View/>
    );
  }
}

Card.propTypes = {
  cardVisible: PropTypes.bool,
  address: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Card;
