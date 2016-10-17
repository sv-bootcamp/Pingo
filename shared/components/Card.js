import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Card extends Component {
  render() {
    return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>{this.props.title}</Text>
			<Text style={styles.address}>{this.props.address}</Text>
				<TouchableOpacity	style={{margin: 1, backgroundColor: 'red', flex: 1}}>
					<Text style={styles.text}>Favorite</Text>
				</TouchableOpacity>
		</View>
	);
  }
}

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

Card.propTypes = {
  address: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default Card;
