import React, {
	PropTypes, Component
} from 'react';

import {
	StyleSheet,
	Text,
	View	
} from 'react-native';

const styles = StyleSheet.create({
	bigText: {
		flex: 2,
		fontSize: 20,
		margin: 10
	},
	mainText: {
		flex: 1,
		fontSize: 16		
	}
});

class Card extends Component {
	render() {
		return (
			<View>
				<Text>tetest</Text>
				<Text style={styles.bigText}>{this.props.title}</Text>
				<Text style={styles.mainText}>{this.props.description}</Text>
			</View>
		);
	}
}

Card.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string
}

export default Card;