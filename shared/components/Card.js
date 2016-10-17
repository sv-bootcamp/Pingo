import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageSwiper from './Imageswiper';

const styles = StyleSheet.create({
  title: {
    flex: 2,
    fontSize: 20,
    margin: 10
  },
  address: {
    flex: 1,
    fontSize: 16
  },
  favorite: {
    flex: 1,
    height: 40,
    width: 40
  }
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isSaved: !this.state.isSaved
    });
  }

  render() {
    return (
    <View>
      <Text style= { styles.title }>{this.props.title}</Text>
			<Text style= { styles.address }>{this.props.address}</Text>
      <ImageSwiper/>
    </View>
	);
  }
}

Card.propTypes = {
  address: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Card;
