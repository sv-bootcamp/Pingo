import React, {
    Component, PropTypes
} from 'react';

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
    color: "#8e8e8e",
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
    flex: 1,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 15
  },
  btn_category: {
    flex: 1,
    height: 46,
    width: 104,
    borderWidth: 1,
    borderColor: "#e7e7e7"
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
      placeholderEnd: "End"
    };
    this.convertMonth = this.convertMonth.bind(this);
    this.handleOnDateChange = this.handleOnDateChange.bind(this);
  }

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

  handleOnDateChange(datetime) {
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
        onDateChange={(datetime) => {this.handleOnDateChange(datetime);}}
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
        onDateChange={(datetime) => {this.handleOnDateChange(datetime);}}
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
          <Text style={styles.text_done}> Location </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_location}
          onPress={this.handleAddExistingLocation.bind(this)}>
          <Text style={styles.text_done}> Location </Text>
        </TouchableOpacity>
      </View>
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
            style={[styles.btn_category, {marginLeft: 16, marginRight: 8}]}
            onPress={()=>{}}>
            <Text style={styles.text_done}> Event </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn_category, {marginRight: 8}]}
            onPress={()=>{}}>
            <Text style={styles.text_done}> Facility </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn_category, {marginRight: 16}]}
            onPress={()=>{}}>
            <Text style={styles.text_done}> Warning </Text>
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

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.header}>
          {this.renderBtnBefore()}
          {this.renderHeaderTitle()}
          {this.renderBtnDone()}
        </View>
        <ScrollView style={styles.container}>
          {this.state.addingNewLocation === true ?
            <View>{this.renderAddNewLocation()}</View> :
            <View>{this.renderCaption()}</View>
          }
        </ScrollView>
      </View>
    );
  }
}

Create.propTypes = {
    pic: PropTypes.string
};

export default Create;
