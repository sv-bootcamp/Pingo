import React, {
	Component, PropTypes
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight	
} from 'react-native';
import TForm from 'tcomb-form-native';

const API_SETITEMS = 'http://goober.herokuapp.com/api/items';
const API_KEY = 'AIzaSyBQj4eFHtV1G9mTKUzAggz384jo4h7oFhg';
const API_GEODATA = 'https://maps.googleapis.com/maps/api/geocode/json';
const Form = TForm.form.Form;

const Event = TForm.struct({
	// location: TForm.String,
  address: TForm.String,
  title: TForm.String,
  startTime: TForm.Date,
  endTime: TForm.Date
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff'
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
  constructor(props) {
    super(props);
    this.state = {
      value: {
        address: '',
        title: ''
      }
    };
    this.getAddressData();
  }

	onPress() {
		const value = this.refs.form.getValue();
		const location = this.props.location;

		if (value) {
			  fetch(API_SETITEMS, {
			  	method: 'POST',
			  	headers: {
			  		'Accept': 'application/json',
			  		'Content-Type': 'application/json'
			  	},
			  	body: JSON.stringify({
			  		description: value.title,
			  		lat: location[0],
			  		lng: location[1],
			  		address: value.address,
					  startTime: value.startTime,
					  endTime: value.endTime
			  	})
			  })
			.then((response) => response.json())
			.then((rjson) => {
			  console.log('r:'+JSON.stringify(rjson));
			})
      .catch((error) => {
        console.warn(error);
      });
    }
  }

  getAddressData() {
    const location = this.props.location;
    fetch(API_GEODATA + '?latlng = ' + location.toString() + '&key = '+ API_KEY)
		.then((response) => response.json())
		.then((responseJson) => {
      const address = responseJson.results[0].formatted_address;
      this.setState({value: {address: address}});
    });
  }

  render() {
    return (
			<View style={styles.container}>
				<Form
					ref="form"
					type={Event}
					value={this.state.value}/>
				<TouchableHighlight style={styles.button}
					onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
			</View>
		);
  }

}

CreateForm.propTypes = {
  location: PropTypes.array
};

CreateForm.defaultProps = {
  location: [37.563398, 126.9907941]
};

export default CreateForm;
