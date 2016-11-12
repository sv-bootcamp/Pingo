import React, { Component, PropTypes } from 'react';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import {Actions} from 'react-native-router-flux';
import SmallHeader from '../components/smallHeader';
import ImgBtnCheck from '../resources/btn_check/drawable-xxxhdpi/check.png';

const photoReportOption = ['Wrong place', 'Poor Image quality', 'Pornography or explicit sexual content',
  'Hate speech or graphic violence', 'Spam', 'Copyrighted content'];
const locationReportOption = ['Permanently closed', 'Does\'nt exist anymall', 'Spam', 'Private', 'Moved elsewhere', 'Duplicate of another place'];
const styles = {
  textStyle: {
    flex: 1,
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  textDone: {
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  }
};

export default class EventReportView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1
    };
    this.renderOption = this.renderOption.bind(this);
  }

  renderOption(title, i) {
    return (
      <View style = {{flex: 46}}>
        <View style = {{flex: 20}}/>
        <View style = {{flex: 26, flexDirection: 'row'}}>
          <View style = {{flex: 304}}>
            <TouchableOpacity onPress = {()=>{
              (this.state.currentIndex === i) ? this.setState({currentIndex: -1}) :
              this.setState({currentIndex: i});
            }}
            style = {{flex: 1}}>
              <View style = {{flex: 6}}/>
              <View style = {{flex: 20, justifyContent: 'center'}}>
                <Text style = {[styles.textStyle, {color: '#2b2b2b'}]}>{title}</Text>
              </View>
              <View style = {{flex: 6}}/>
            </TouchableOpacity>
          </View>
          <View style = {{flex: 16, justifyContent: 'center'}}>
            {
              (this.state.currentIndex === i) ?
              <Image source = {ImgBtnCheck}
                     style = {{height: 16, width: 16}}/> : null
            }
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <SmallHeader
          handleBtnLeft={()=>{
            Actions.pop();
          }}
          handleBtnRight={()=>{
            (this.props.aboutPhoto) ? this.props.handleReport('photo') : this.props.handleReport('location');
            Actions.pop();
          }}
          btnRight={
            <Text style={[styles.textDone, {color: (this.state.currentIndex !== -1) ? '#2c8cff' : '#8e8e8e'}]}> Done </Text>
          }
          headerText={'Report an Issue'}
        />
      <View style = {{flexDirection: 'row', flex: 1}}>
          <View style = {{flex: 16}}/>
          <View style = {{flex: 328}}>
            <View style = {{flex: 32}}/>
            <View style = {{flex: 16}}>
              {
                <Text style = {[styles.textStyle, {color: '#8e8e8e'}]}> {(this.props.aboutPhoto) ?
                    'What\'s wrong this photo?' : 'What\'s wrong this location?' } </Text>
              }
            </View>
            {
              (this.props.aboutPhoto) ?
              photoReportOption.map((value, i) => {
                return (
                  this.renderOption(value, i)
                );
              }) :
              locationReportOption.map((value, i) => {
                return (
                  this.renderOption(value, i)
                );
              })
            }
            <View style = {{flex: 251}}/>
          </View>
          <View style = {{flex: 16}}/>
        </View>
      </View>
    );
  }
}

EventReportView.propTypes = {
  aboutPhoto: PropTypes.boolean,
  handleReport: PropTypes.fucntion
};
