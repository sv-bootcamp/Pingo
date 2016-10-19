import React, {
	Component, PropTypes
} from 'react';

import {
	StyleSheet,
  Image,
	Text,
	View,
	TouchableHighlight  
} from 'react-native';
import {Buffer} from 'buffer';
import TForm from 'tcomb-form-native';
import RNFS from 'react-native-fs';

const API_SETITEMS = 'http://goober.herokuapp.com/api/items';
const API_KEY = 'AIzaSyBQj4eFHtV1G9mTKUzAggz384jo4h7oFhg';
const API_GEODATA = 'https://maps.googleapis.com/maps/api/geocode/json';
const Form = TForm.form.Form;

const Category = TForm.enums({
  Event: 'Event',
  Facility: 'Facility',
  Warning: 'Warning'
});

const Event = TForm.struct({
	// location: TForm.String,
  caption: TForm.String,
  address: TForm.String,
  title: TForm.String,
  category: Category, // enum
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
        title: '',
        category: 'Event',
        img: '/Users/elegantuniv/Library/Developer/CoreSimulator/Devices/68C77AD4-A7EB-4395-AF92-28B60950BBC9/data/Containers/Data/Application/25A00196-A2AE-460C-A3C4-575118D55FFF/Documents/EF9E211C-EAE7-4CA9-A729-4AB2B1E618F8.jpg'
      }
    };
    this.getAddressData();

    const uri = '/Users/elegantuniv/Library/Developer/CoreSimulator/Devices/68C77AD4-A7EB-4395-AF92-28B60950BBC9/data/Containers/Data/Application/25A00196-A2AE-460C-A3C4-575118D55FFF/Documents/EF9E211C-EAE7-4CA9-A729-4AB2B1E618F8.jpg';
    
    RNFS.readFile(uri, 'base64')
    .then((file) =>{
      const enc = new Buffer(file, 'binary').toString('base64');
      console.log("d:"+enc);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
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
            caption: value.caption,
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
    const options = {
      fields: {
        caption: {
          auto: 'placeholders'
        },
        address: {
          auto: 'placeholders'
        },
        title: {
          auto: 'placeholders'
        },
        startTime: {
          label: '+ Start at ...'
        },
        endTime: {
          label: '+ End at ...'
        }
      }       
    };

    return (
			<View style={styles.container}>
        <Image source={{uri: this.state.value.img}} style={{width: 120, height: 120}} />
				<Form
					ref="form"
					type={Event}
					value={this.state.value}
          options={options} />
				<TouchableHighlight style={styles.button}
					onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
			</View>
		);
  }

}

CreateForm.propTypes = {
  location: PropTypes.array,
  img: PropTypes.string
};

CreateForm.defaultProps = {
  location: [37.563398, 126.9907941]
};

export default CreateForm;
