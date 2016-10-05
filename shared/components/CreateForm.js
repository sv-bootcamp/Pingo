import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight
} from 'react-native';
import TForm from 'tcomb-form-native';

const Form = TForm.form.Form;

const Event = TForm.struct({
	location: TForm.String,
	title: TForm.String,
	category: TForm.Number
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class CreateForm extends Component {
	onPress() {
		const value = this.refs.form.getValue();
		if(value) {
			console.log(value);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Form
					ref="form"
					type={Event}/>
				<TouchableHighlight style={styles.button} 
					onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
			</View>
		);
	}

}

export default CreateForm;
