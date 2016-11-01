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

const styles = StyleSheet.create({
  preview: {
    height: 104,
    width: 104
  },
  header: {
    height: 64,
    width: Dimensions.get('window').width,
    backgroundColor: "#f8f8f8",
    flexDirection: 'row',
    marginBottom: 20
  },
  text_header: {
    fontSize: 17,
    left: Dimensions.get('window').width / 2 - 70,
    top: 24,
    color: "#2b2b2b",
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_done: {
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_caption: {
    fontSize: 14,
    color: "#8e8e8e",
    left: 12,
    marginBottom: 5,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_location: {
    fontSize: 14,
    color: "#8e8e8e",
    left: 12,
    marginBottom: 5,
    marginTop: 20,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  text_addNewLocation: {
    fontSize: 17,
    left: Dimensions.get('window').width / 2 - 95,
    top: 24,
    color: "#2b2b2b",
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
  btn_before: {
    left: 15,
    top: 24
  },
  btn_done: {
    position: 'absolute',
    right: 15,
    top: 24
  },
  btn_location: {
    height: 75,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 15
  },
  btn_category: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e7e7e7",
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_text: {
    height: 104,
    flex: 1,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 16
  },
  input_location: {
    height: 46,
    flex: 1,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginRight: 16,
    marginLeft: 16
  },
  DatePicker: {
    height: 46,
    width: Dimensions.get('window').width - 32,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginRight: 16,
    marginLeft: 16
  }
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      addingNewLocation: false,
      dateStart: "",
      dateEnd: "",
      placeholderStart: "Start",
      placeholderEnd: "End",
      category: {
        colorEvent: 'white',
        colorFacility: 'white',
        colorWarning: 'white',
        select: ''
      }
    };
  }

  //todo: implement function getting markers around the user's location
  /*
    async getItemsAroundUser() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.getAllItems(
          this.props.zoomLevel,
          position.coords.latitude,
          position.coords.longitude);
        }
      );
    }
  */

  handleBefore() {
    if(this.state.addingNewLocation === true) {
      this.setState({
        addingNewLocation: false
      });
    } else if(this.state.addingNewLocation === false) {
      this.setState({
        addingNewLocation: false
      });
      Actions.pop();
    }
  }

  handleDone() {
    //todo: handle Done button here
  }

  handleAddNewLocation() {
    this.setState({
      addingNewLocation: true
    })
  }

  handleAddExistingLocation() {
    //todo: implement adding photo to an existing location
  }

  handleCategoryButton(select) {
    if (select === 'event') {
      if (this.state.category.select === 'event') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
        this.setState({});
      } else {
        this.state.category.colorEvent = '#f6a302';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = 'event';
        this.setState({});
      }
    } else if (select === 'facility') {
      if (this.state.category.select === 'facility') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
        this.setState({});
      } else {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = '#2c8cff';
        this.state.category.colorWarning = 'white';
        this.state.category.select = 'facility';
        this.setState({});
      }
    } else if (select === 'warning') {
      if (this.state.category.select === 'warning') {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = 'white';
        this.state.category.select = '';
        this.setState({});
      } else {
        this.state.category.colorEvent = 'white';
        this.state.category.colorFacility = 'white';
        this.state.category.colorWarning = '#ff5250';
        this.state.category.select = 'warning';
        this.setState({});
      }
    }
  }

  convertMonth(m) {
    switch (m) {
    case '1': return 'Jan.';
    case '2': return 'Feb.';
    case '3': return 'Mar.';
    case '4': return 'Apr.';
    case '5': return 'May';
    case '6': return 'Jun.';
    case '7': return 'Jul.';
    case '8': return 'Aug.';
    case '9': return 'Sept.';
    case '10': return 'Oct.';
    case '11': return 'Nov.';
    case '12': return 'Dec.';
    default: return '';
    }
  }

  handleOnDateChangeStart(datetime) {
    this.setState({dateStart: datetime});
    let a = new Date(datetime);
    let txtDate = this.convertMonth(
      a.format('MM')) + ' ' +
      a.format('DD') + ', ' +
      a.format('hh') + ':' +
      a.format('mm') +
      a.format('a');
    this.setState({placeholderStart: txtDate});
  }

  handleOnDateChangeEnd(datetime) {
    this.setState({dateEnd: datetime});
    let a = new Date(datetime);
    let txtDate = this.convertMonth(
      a.format('MM')) + ' ' +
      a.format('DD') + ', ' +
      a.format('hh') + ':' +
      a.format('mm') +
      a.format('a');
    this.setState({placeholderEnd: txtDate});
  }

  renderDatePickerStart() {
    return (
      <DatePicker
        style={[styles.DatePicker]}
        date={""}
        placeholder={this.state.placeholderStart}
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
          borderWidth: 0
        },
          placeholderText: {
          color: '#8e8e8e',
          fontSize: 14,
          left: 95,
          top: 2
        }}}
        onDateChange={(datetime) => {this.handleOnDateChangeStart(datetime);}}
      />
    )
  }

  renderDatePickerEnd() {
    return (
      <DatePicker
        style={[styles.DatePicker, {marginTop: 8}]}
        date={""}
        placeholder={this.state.placeholderEnd}
        mode="datetime"
        format="YYYY-MM-DD HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
          borderWidth: 0
        },
          placeholderText: {
          color: '#8e8e8e',
          fontSize: 14,
          left: 95
        }}}
        onDateChange={(datetime) => {this.handleOnDateChangeEnd(datetime);}}
      />
    )
  }

  renderCaption() {
    return (
      <View>
        <Text style={styles.text_caption}> Caption </Text>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <TextInput
            style={styles.input_text}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline={true}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Image source={{uri: this.props.pic}} style={[styles.preview, {marginRight: 16}]}/>
        </View>
        <Text style={styles.text_caption}> Location </Text>
        <TouchableOpacity
          style={styles.btn_location}
          onPress={this.handleAddNewLocation.bind(this)}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={styles.textItemAddress}>75 St. Nicholas St.</Text>
              <Text style={styles.textItemTitle}>Add New Location</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.textItemUnit}>
                0 km
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {this.renderAroundLocations()}
      </View>
    )
  }

  getDistanceFromLatLonInKm(lat1,lon1) {
    let lat2 = this.props.currentLocation.latitude;
    let lon2 = this.props.currentLocation.longitude;
    let R = 6371;
    let dLat = (lat2-lat1) * (Math.PI/180);
    let dLon = (lon2-lon1) * (Math.PI/180);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2);
  }

  // todo: remove item.address.substring(n,cnt) after changing post address func
  // todo: should limit item.title length if it is too long
  renderAroundLocations() {
    return (
      this.props.dataSource.map(item => (
      <TouchableOpacity
        style={styles.btn_location}
        onPress={this.handleAddExistingLocation.bind(this)}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.textItemAddress}>{item.address.substring(0,18)}</Text>
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
        <Text style={styles.text_caption}> Location </Text>
        <TextInput
          style={styles.input_location}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          multiline={false}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
        <Text style={styles.text_location}> Title </Text>
        <TextInput
          style={styles.input_location}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          multiline={false}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
        <Text style={styles.text_location}> Category </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.btn_category,
              {marginLeft: 16, marginRight: 8, backgroundColor: this.state.category.colorEvent}]}
            onPress={()=>{this.handleCategoryButton('event')}}>
            <Text style={[styles.text_done,
              {color: (this.state.category.select === 'event') ? '#ffffff' : '#8e8e8e'}]}> Event </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn_category,
              {marginRight: 8, backgroundColor: this.state.category.colorFacility}]}
            onPress={()=>{this.handleCategoryButton('facility')}}>
            <Text style={[styles.text_done,
              {color: (this.state.category.select === 'facility') ? '#ffffff' : '#8e8e8e'}]}> Facility </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn_category,
              {marginRight: 16, backgroundColor: this.state.category.colorWarning}]}
            onPress={()=>{this.handleCategoryButton('warning')}}>
            <Text style={[styles.text_done,
              {color: (this.state.category.select === 'warning') ? '#ffffff' : '#8e8e8e'}]}> Warning </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.text_location}> Time (optional) </Text>
          {this.renderDatePickerStart()}
          {this.renderDatePickerEnd()}
        </View>
      </View>
    )
  }

  renderBtnBefore() {
    return (
      <TouchableOpacity
        style={styles.btn_before}
        onPress={this.handleBefore.bind(this)}>
        <Image
          style={{height:24, width: 24}}
          source={require('../resources/camera/btn_before.png')}
        />
      </TouchableOpacity>
    )
  }

  renderHeaderTitle() {
    return (
      this.state.addingNewLocation === true ?
        <Text style={styles.text_addNewLocation}>Add new location</Text> :
        <Text style={styles.text_header}>Post Photo</Text>
    )
  }

  renderBtnDone() {
    return (
      <TouchableOpacity
        style={styles.btn_done}
        onPress={this.handleDone.bind(this)}>
        <Text style={styles.text_done}> Done </Text>
      </TouchableOpacity>
    )
  }

  // todo: the View wrapping scrollView style.height must be changed
  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          {this.renderBtnBefore()}
          {this.renderHeaderTitle()}
          {this.renderBtnDone()}
        </View>
          <View style={{height: 669 - 75}}>
            <ScrollView>
              {this.state.addingNewLocation === true ?
                <View>{this.renderAddNewLocation()}</View> :
                <View>{this.renderCaption()}</View>
              }
            </ScrollView>
          </View>
      </View>
    );
  }
}

Create.propTypes = {
  pic: PropTypes.string,
  getAllItems: PropTypes.func,
  zoomLevel: PropTypes.any,
  dataSource: PropTypes.any,
  currentLocation: PropTypes.any
};

export default Create;
