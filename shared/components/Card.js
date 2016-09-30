import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	Text,
	View,	
	Image
} from 'react-native';

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

export default Card;