import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
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
    return (
		<View>
			<Text style={styles.title}>{this.props.title}</Text>
			<Text style={styles.address}>{this.props.address}</Text>
				<TouchableOpacity	style={{margin: 1, backgroundColor: 'red', flex: 1}}>
					<Text style={styles.text}>Favorite</Text>
				</TouchableOpacity>
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
