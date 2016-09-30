import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,	
} from 'react-native';

import Card from './Card.js';
import EventList from './EventList.js';

class GooberProject extends Component {
	constructor(props) {
		super(props);
		this.state = { zip: '', 
			card: {
				title: 'Title',
				description: 'desc'
			} 
		};
	}

	_handleTextChange(event) {
		console.log(event.nativeEvent.text);
		this.setState({zip: event.nativeEvent.text});
	}

  	render() {
      const card = <Card 
          title={this.state.card.title}
          description={this.state.card.description} />;

      const imgBack = <Image source={require('../../static/images/flowers.png')} resizeMode='cover' style={styles.backdrop}>
          <Text style={styles.welcome}>
            Welcome to React Native!!! {this.state.zip}
          </Text>
        </Image>; 

    	return (

  		<View style={styles.container}>
        <EventList />        
        
	    	<TextInput
	    		style={styles.input}
	    		returnKeyType='go'
	    		onSubmitEditing={(event) => this._handleTextChange(event)} />
  		</View>
    	);
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
  	fontSize: 20,
  	borderWidth: 2,
  	height: 40
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default GooberProject;