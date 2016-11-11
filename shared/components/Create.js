import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Date from 'moment';
import { Actions } from 'react-native-router-flux';
import RNFS from 'react-native-fs';
import {HTTP, SERVER_ADDR, ENDPOINT_ITEM, ENDPOINT_IMAGE, API_GEODATA, API_KEY} from '../utils';
import SmallHeader from '../components/smallHeader';

import ImgBtnCheck from '../resources/camera/btn_check.png';
import ImgLocation from '../resources/create/btn_location.png';

const styles = StyleSheet.create({
  preview: {
    height: 104,
    width: 104
  },
  textDone: {
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  textCaption: {
    fontSize: 14,
    color: '#8e8e8e',
    left: 12,
    marginBottom: 5,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  textLocation: {
    fontSize: 14,
    color: '#8e8e8e',
    left: 12,
    marginBottom: 5,
    marginTop: 20,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  textItemAddress: {
    fontSize: 14,
    color: '#8e8e8e',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    }),
    marginLeft: 16
  },
  textItemTitle: {
    fontSize: 19,
    color: '#8e8e8e',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    }),
    marginLeft: 16,
    marginTop: 4
  },
  textItemUnit: {
    marginRight: 16,
    textAlign: 'right',
    fontSize: 14,
    color: '#8e8e8e',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  textPlaceholder: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 16,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  btnLocation: {
    height: 75,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 15
  },
  btnCategory: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnCheck: {
    height: 24,
    width: 24,
    alignSelf: 'flex-end',
    marginRight: 16
  },
  inputText: {
    height: 104,
    flex: 1,
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 16
  },
  inputLocation: {
    height: 46,
    flex: 1,
    borderWidth: 1,
    marginRight: 16,
    marginLeft: 16,
    padding: 16
  },
  DatePicker: {
    height: 46,
    width: Dimensions.get('window').width - 32,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginRight: 16,
    marginLeft: 16
  },
  fontRobotoRegular: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  }
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNewLocation: false,
      category: {
        colorEvent: 'white',
        colorFacility: 'white',
        colorWarning: 'white',
        select: ''
      },
      dateStart: '',
      dateEnd: '',
      Done: false,
      streetName: '',
      streetNumber: '',
      placeholderStart: ' ',
      placeholderEnd: ' ',
      inputTextCaption: '',
      inputTextLocation: '',
      inputTextTitle: '',
      img: '',
      onFocusCaption: false,
      onFocusLocation: false,
      onFocusTitle: false,
      onFocusDateStart: false,
      onFocusDateEnd: false,
      busyPosting: false
    };

    this.getAddressData();
    this.encodePictureBase64();
  }

  encodePictureBase64() {
    RNFS.readFile(this.props.pic.replace('file:///', ''), 'base64')
      .then((file) =>{
        this.setState({img: file});
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  handleBefore() {
    if (this.state.addingNewLocation === true) {
      this.setState({addingNewLocation: false});
    } else if (this.state.addingNewLocation === false) {
      Actions.pop();
    }
  }

  handleDone() {
    if (this.state.addingNewLocation === true && this.state.Done === true) {
      this.setState({addingNewLocation: false});
    } else if (this.state.addingNewLocation === false && this.state.Done === true && this.state.busyPosting === false) {
      this.setState({busyPosting: true});
      this.postNewItem();
    }
  }

  postNewItem() {
    const data = JSON.stringify({
      title: this.state.inputTextTitle,
      lat: this.props.currentLocation.latitude,
      lng: this.props.currentLocation.longitude,
      address: `${this.state.streetNumber} ${this.state.streetName}`,
      category: this.state.category.select,
      image: String(this.state.img),
      userKey: 'user-8523574664000-b82e-473b-1234-ead0f54gvr00',
      startTime: this.state.dateStart,
      endTime: this.state.dateEnd,
      caption: this.state.inputTextCaption
    });

    const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_ITEM}`;
    fetch(address, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then((response) => response.json())
      .then(() => {
        this.props.setCurrentScene('map');
        Actions.pop({popNum: 2});
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  getAddressData() {
    const uri = `${API_GEODATA}?latlng=${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}&key=${API_KEY}`;
    fetch(uri)
      .then((response) => response.json())
      .then((responseJson) => {
        const streetNumber = JSON.stringify(responseJson.results[0].address_components[0].short_name).replace('"', '').replace('"','');
        const streetName = JSON.stringify(responseJson.results[0].address_components[1].short_name).replace('"', '').replace('"','');
        this.setState({streetName: streetName, streetNumber: streetNumber});
      });
  }

  checkDone() {
    if (this.state.inputTextTitle !== '' &&
      this.state.category.select !== '') {
      this.setState({Done: true});
    } else if (this.state.Done !== false) {
      this.setState({Done: false});
    }
  }

  handleAddNewLocation() {
    this.setState({
      addingNewLocation: true
    });
  }

  // todo:  should check whether response contain error or not.
  // If response contain error property, It was a fail post
  // Check out APIDoc
  // https://goober.herokuapp.com/docs/#api-Image-addAnImage
  handleAddExistingLocation(itemKey, userKey, caption, image) {
    const data = JSON.stringify({
      itemKey: itemKey,
      userKey: userKey,
      caption: caption,
      image: image
    });

    const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_IMAGE}`;
    fetch(address, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then((response) => response.json())
      .then(() => {
        this.props.setCurrentScene('map');
        Actions.pop({popNum: 2});
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  handleCategoryButton(select) {
    if (select === 'event') {
      if (this.state.category.select === 'event') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
      } else {
        this.state.category.colorEvent = '#f6a302';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = 'event';
      }
    } else if (select === 'facility') {
      if (this.state.category.select === 'facility') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
      } else {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = '#2c8cff';
        this.state.category.colorWarning = 'white';
        this.state.category.select = 'facility';
      }
    } else if (select === 'warning') {
      if (this.state.category.select === 'warning') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
      } else {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = '#ff5250';
        this.state.category.select = 'warning';
      }
    }
    this.setState({});
    this.checkDone();
  }

  convertMonth(m) {
    const month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    return month[m - '1'];
  }

  handleOnDateChangeStart(datetime) {
    const a = new Date(datetime);
    this.setState({dateStart: a.toISOString()});
    const txtDate = `${this.convertMonth(a.format('MM'))}${a.format('DD')},${a.format('hh')}:${a.format('mm')}${a.format('a')}`;
    this.setState({placeholderStart: txtDate});
  }

  handleOnDateChangeEnd(datetime) {
    const a = new Date(datetime);
    this.setState({dateEnd: a.toISOString()});
    const txtDate = `${this.convertMonth(a.format('MM'))}${a.format('DD')},${a.format('hh')}:${a.format('mm')}${a.format('a')}`;
    this.setState({placeholderEnd: txtDate});
  }

  // todo: change placeholder style
  renderDatePickerStart() {
    return (
      <View>
        <View style={{marginLeft: 32, zIndex: 1, position: 'absolute'}}>
          <Text style={[styles.fontRobotoRegular,
            {marginTop: 12, color: (this.state.dateStart === '') ? '#8e8e8e' : '#2b2b2b'}]}>
            Starts
          </Text>
        </View>
        <DatePicker
          style={styles.DatePicker}
          date={''}
          placeholder={this.renderPlaceholderStart(this.state.placeholderStart)}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0
            },
            placeholderText: [styles.textPlaceholder,
              {color: (this.state.dateStart === '') ? '#8e8e8e' : '#2b2b2b'}]
          }}
          onDateChange={(datetime) => {
            this.handleOnDateChangeStart(datetime);
          }}
        />
      </View>
    );
  }

  renderDatePickerEnd() {
    return (
      <View>
        <View style={{marginLeft: 32, zIndex: 1, position: 'absolute'}}>
          <Text style={[styles.fontRobotoRegular,
            {marginTop: 12 + 8, color: (this.state.dateEnd === '') ? '#8e8e8e' : '#2b2b2b'}]}>
            Ends
          </Text>
        </View>
        <DatePicker
          style={[styles.DatePicker, {marginTop: 8}]}
          date={''}
          placeholder={this.renderPlaceholderEnd(this.state.placeholderEnd)}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0
            },
            placeholderText: [styles.textPlaceholder,
              {color: (this.state.dateEnd === '') ? '#8e8e8e' : '#2b2b2b'}]
          }}
          onDateChange={(datetime) => {
            this.handleOnDateChangeEnd(datetime);
          }}
        />
      </View>
    );
  }

  renderPlaceholderStart(text) {
    if (this.state.dateStart !== '' && this.state.dateEnd === '') {
      return (` ${text}`);
    } else if ((this.state.dateStart === '' && this.state.dateEnd === '')) {
      return ' ';
    } else if (this.state.dateStart !== '' && this.state.dateEnd !== '') {
      return (` ${text}`);
    }
    return '-';
  }

  renderPlaceholderEnd(text) {
    if (this.state.dateStart === '' && this.state.dateEnd !== '') {
      return (` ${text}`);
    } else if (this.state.dateStart === '' && this.state.dateEnd === '') {
      return ' ';
    } else if (this.state.dateStart !== '' && this.state.dateEnd !== '') {
      return (` ${text}`);
    }
    return '-';
  }

  renderCaption() {
    return (
      <View>
        <Text style={styles.textCaption}> Caption </Text>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <TextInput
            style={[styles.inputText, {padding: 16, borderColor: (this.state.onFocusCaption === true) ? '#2c8cff' : '#dcdcdc'}]}
            onChangeText={(text) => this.setState({inputTextCaption: text})}
            value={this.state.inputTextCaption}
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => {
              this.setState({onFocusCaption: true});
            }}
            onEndEditing={() => {
              this.setState({onFocusCaption: false});
            }}
            autoFocus={true}
          />
          <Image source={{uri: this.props.pic}} style={[styles.preview, {marginRight: 16}]}/>
        </View>
        <Text style={styles.textCaption}> Location </Text>
        <TouchableOpacity
          style={[styles.btnLocation, {borderColor: (this.state.Done === true) ? '#8e8e8e' : '#e7e7e7'}]}
          onPress={this.handleAddNewLocation.bind(this)}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={[styles.textItemAddress, {color: (this.state.Done === true) ? '#2b2b2b' : '#8e8e8e'}]}>
                {this.state.streetNumber} {this.state.streetName}
              </Text>
              <Text style={[styles.textItemTitle, {color: (this.state.Done === true) ? '#2b2b2b' : '#8e8e8e'}]}>
                {(this.state.Done === true) ? this.state.inputTextTitle : 'Add New Location'}
              </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              {(this.state.Done === true) ?
                <Image source={ImgBtnCheck} style={styles.btnCheck}/> :
                <Text style={styles.textItemUnit}>0 km</Text>
              }
            </View>
          </View>
        </TouchableOpacity>
        {this.renderAroundLocations()}
      </View>
    );
  }

  getDistanceFromLatLonInKm(ItemLat, ItemLong) {
    const UserLat = this.props.currentLocation.latitude;
    const UserLong = this.props.currentLocation.longitude;
    const R = 6371;
    const dLat = (UserLat - ItemLat) * (Math.PI / 180);
    const dLon = (UserLong - ItemLong) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((ItemLat) * (Math.PI / 180)) * Math.cos((UserLat) * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  }

  // todo: should limit item.title length if it is too long
  renderAroundLocations() {
    return (
      this.props.dataSource.map(item => (
        <TouchableOpacity
          style={[styles.btnLocation, {borderColor: '#e7e7e7'}]}
          onPress={() => {
            this.handleAddExistingLocation(item.key, item.userKey, this.state.inputTextCaption, this.state.img);
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={styles.textItemAddress}>{item.address.substring(0, 18)}</Text>
              <Text style={styles.textItemTitle}>{item.title}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.textItemUnit}>
                {this.getDistanceFromLatLonInKm(item.lat, item.lng)} km
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    )
  }

  renderAddNewLocation() {
    return (
      <View>
        <Text style={styles.textCaption}> Location </Text>
        <TextInput
          style={[styles.inputLocation, {borderColor: (this.state.onFocusLocation === true) ? '#2c8cff' : '#dcdcdc'}]}
          onChangeText={(text) => {
            this.setState({inputTextLocation: text});
            if (this.state.onFocusLocation === false) {
              this.setState({onFocusLocation: true});
            }
          }}
          value={`${this.state.streetNumber} ${this.state.streetName}`}
          multiline={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onFocus={() => {
            this.setState({onFocusLocation: true});
          }}
          onEndEditing={() => {
            this.setState({onFocusLocation: false});
          }}
          onSubmitEditing={() => {
            this.setState({onFocusLocation: false});
          }}
        />
        <Text style={styles.textLocation}> Title </Text>
        <TextInput
          style={[styles.inputLocation, {borderColor: (this.state.onFocusTitle === true) ? '#2c8cff' : '#dcdcdc'}]}
          onChangeText={(text) => {
            this.setState({inputTextTitle: text});
            this.checkDone();
            if (this.state.onFocusTitle === false) {
              this.setState({onFocusTitle: true});
            }
          }}
          value={this.state.inputTextTitle}
          multiline={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onFocus={() => {
            this.setState({onFocusTitle: true});
          }}
          onEndEditing={() => {
            this.setState({onFocusTitle: false});
          }}
          onSubmitEditing={() => {
            this.setState({onFocusTitle: false});
          }}
          autoFocus={true}
        />
        <Text style={styles.textLocation}> Category </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.btnCategory,
              {marginLeft: 16, marginRight: 8, backgroundColor: this.state.category.colorEvent,
                borderColor: (this.state.category.select === 'event') ? 'white' : '#e7e7e7'}]}
            onPress={()=>{
              this.handleCategoryButton('event');
            }}>
            <Text style={[styles.textDone, styles.fontRobotoRegular, { fontSize: 14,
              color: (this.state.category.select === 'event') ? '#ffffff' : '#8e8e8e'}]}> Event </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnCategory,
              {marginRight: 8, backgroundColor: this.state.category.colorFacility,
                borderColor: (this.state.category.select === 'facility') ? 'white' : '#e7e7e7'}]}
            onPress={()=>{
              this.handleCategoryButton('facility');
            }}>
            <Text style={[styles.textDone, styles.fontRobotoRegular, { fontSize: 14,
              color: (this.state.category.select === 'facility') ? '#ffffff' : '#8e8e8e'}]}> Facility </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnCategory,
              {marginRight: 16, backgroundColor: this.state.category.colorWarning,
                borderColor: (this.state.category.select === 'warning') ? 'white' : '#e7e7e7'}]}
            onPress={()=>{
              this.handleCategoryButton('warning');
            }}>
            <Text style={[styles.textDone, styles.fontRobotoRegular, { fontSize: 14,
              color: (this.state.category.select === 'warning') ? '#ffffff' : '#8e8e8e'}]}> Warning </Text>
          </TouchableOpacity>
        </View>
        {(this.state.category.select === 'facility') ? null :
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.textLocation}> Time (optional) </Text>
            {this.renderDatePickerStart()}
            {this.renderDatePickerEnd()}
          </View>
        }
      </View>
    );
  }

  // todo: the View wrapping scrollView style.height must be changed
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <SmallHeader
          addingNewLocation={this.state.addingNewLocation}
          Done={this.state.Done}
          handleBtnLeft={this.handleBefore.bind(this)}
          handleBtnRight={this.handleDone.bind(this)}
          btnRight={
            <Text style={[styles.textDone, {color: (this.state.Done === true) ? '#2c8cff' : '#8e8e8e'}]}> Done </Text>
          }
          headerText={
            this.state.addingNewLocation === true ? 'Add new location' : 'Post Photo'
          }
          activeOpacity={(this.state.Done === true) ? 0.2 : 1}
        />
        <View style={{height: 669 - 75, marginTop: 20}}>
          <ScrollView>
            {this.state.addingNewLocation === true ?
              <View>{this.renderAddNewLocation()}</View> :
              <View>{this.renderCaption()}</View>
            }
          </ScrollView>
        </View>
        <View style={{
          height: Dimensions.get('window').height * 24 / 640,
          width: Dimensions.get('window').width * 24 / 360,
          position: 'absolute',
          top: Dimensions.get('window').height * 124 / 640 - Dimensions.get('window').height * 24 / 1280,
          right: Dimensions.get('window').width * 27 / 360,
          zIndex: 10
        }}>
          <TouchableOpacity onPress={this.getAddressData.bind(this)}>
            <Image
              style={{
                height: Dimensions.get('window').height * 24 / 640,
                width: Dimensions.get('window').width * 24 / 360
              }}
              source={ImgLocation}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Create.propTypes = {
  pic: PropTypes.string,
  getAllItems: PropTypes.func,
  setCurrentScene: PropTypes.func,
  zoomLevel: PropTypes.any,
  dataSource: PropTypes.any,
  currentLocation: PropTypes.any
};

export default Create;
