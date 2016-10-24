import React, {
	Component, PropTypes
} from 'react';

import {
  ActivityIndicator,
	StyleSheet,
  Image,
	Text,
  ScrollView,
	TouchableHighlight
} from 'react-native';
import {Buffer} from 'buffer';
import TForm from 'tcomb-form-native';
import RNFS from 'react-native-fs';
import {Actions} from 'react-native-router-flux';

const API_SETITEMS = 'http://goober.herokuapp.com/api/items';
const API_KEY = 'AIzaSyBQj4eFHtV1G9mTKUzAggz384jo4h7oFhg';
const API_GEODATA = 'https://maps.googleapis.com/maps/api/geocode/json';
const Form = TForm.form.Form;

const Category = TForm.enums({
  event: 'event',
  facility: 'facility',
  warning: 'warning'
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
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  preview: {
    width: 120,
    height: 120,
    marginBottom: 20,
    alignSelf: 'center'
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
  },
  centering: {
    position: 'absolute',
    flex: 1,
    top: 200,
    left: 130,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
});

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        address: '',
        title: '',
        category: 'event'
      },
      animating: false
    };
  }

  componentWillMount() {
    this.getAddressData();

    const uri = this.props.pic;

    RNFS.readFile(uri, 'base64')
    .then((file) =>{
      const enc = new Buffer(file, 'binary').toString('base64');
      // console.log(enc);
      this.setState({img: enc});
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  onPress() {
    if (this.state.animating) {
      return;
    }

  this.setState({animating: true});

    const value = this.refs.form.getValue();
    const location = this.props.location;
    const img = this.state.img;
    if (value) {
      fetch(API_SETITEMS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: String(value.title),
					lat: location[0],
					lng: location[1],
					address: String(value.address),
					category: String(value.category),
					image: String(img),
					userKey: 'user-8523574664000-b82e-473b-1234-ead0f54gvr00',
					startTime: String(value.startTime),
					endTime: String(value.endTime),
					caption: String(value.caption)
				})
			})
			.then((response) => response.json())
			.then((rjson) => {
			  console.log('r:'+JSON.stringify(rjson));
        this.setState({animating: false});
        Actions.map();
      })
      .catch((error) => {
        console.warn(error);
        this.setState({animating: false});
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
			<ScrollView style={styles.container}>
        <Text style={styles.title}>{this.props.encpic}</Text>
        <Image source={{uri: this.props.pic}} style={styles.preview} />
				<Form
					ref="form"
					type={Event}
					value={this.state.value}
          options={options} />
				<TouchableHighlight style={styles.button}
					onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableHighlight>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large" />
			</ScrollView>
		);
  }

}

CreateForm.propTypes = {
  location: PropTypes.array,
  setEncPic: PropTypes.func,
  pic: PropTypes.string,
  encpic: PropTypes.string
};

CreateForm.defaultProps = {
  location: [37.563398, 126.9907941]
};

export default CreateForm;
