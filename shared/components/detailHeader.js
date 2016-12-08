import React, { PropTypes, Component } from 'react';
import { View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import {Actions} from 'react-native-router-flux';
import IMG_BUTTON_CLOSE from '../resources/btn_close/drawable-xxxhdpi/btn_close.png';
import IMG_BUTTON_STAR from '../resources/btn_star/drawable-xxxhdpi/btn_star.png';
import IMG_BUTTON_MORE from '../resources/btn_more/drawable-xxxhdpi/btn_more.png';
import IMG_BUTTON_YELLOW_STAR from '../resources/btn_star_yellow/drawable-mdpi/btn_star.png';

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7'
  },
  btnClose: {
    flex: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    flex: 210,
    justifyContent: 'center'
  },
  btn_more: {
    flex: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_star: {
    flex: 24,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    }),
    fontSize: 14,
    fontWeight: 'bold'
  }
};

export default class DetailHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSaved: this.props.isSaved
    };
    this.handlePressStar = this.handlePressStar.bind(this);
  }

  handlePressStar() {
    // todo: I will apply this function to redux soon!
    if (this.state.isSaved === true) {
      this.setState({isSaved: false});
      this.props.deleteEvent(this.props.itemKey);
    } else {
      this.setState({isSaved: true});
      this.props.saveEvent(this.props.itemKey);
    }
    this.props.toggleStar();
  }


  render() {
    return (
      <View style = {styles.wrapper}>
        <View style = {styles.btnClose}>
          <TouchableOpacity
            onPress = {()=>{
              this.props.setCurrentScene(this.props.lastScene);
              Actions.pop();
            }}>
            <Image source = {IMG_BUTTON_CLOSE}
                   style = {{height: 24, width: 24}}/>
          </TouchableOpacity>
        </View>
        <View style = {styles.info}>
          <Text
            style = {styles.title}
            onLayout={(evt) => {
              this.props.setModalPosition(evt.nativeEvent.layout.y);
            }}>
            {this.props.title}
          </Text>
          {(this.props.date) ? <Text> {this.props.date} </Text> : null}
        </View>
          <View style = {styles.btn_star}>
              <TouchableOpacity onPress = {() => {
                this.handlePressStar();
                this.setState({isSaved: !this.state.isSaved});
              }}>
                <Image source = {(this.state.isSaved) ? IMG_BUTTON_YELLOW_STAR : IMG_BUTTON_STAR}
                       style = {{height: 24, width: 24}}/>
              </TouchableOpacity>
          </View>
          <View style = {{flex: 16}}/>
          <View style = {styles.btn_more}>
              <TouchableOpacity onPress = {() => {
                this.props.messageUnvisible();
                this.props.setModalVisible();
              }}>
                <Image source = {IMG_BUTTON_MORE}
                       style = {{height: 24, width: 24}}/>
              </TouchableOpacity>
          </View>
          <View style = {{flex: 6}}/>
      </View>
    );
  }
}

DetailHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  setCurrentScene: PropTypes.func,
  lastScene: PropTypes.string,
  messageUnvisible: PropTypes.func,
  setModalVisible: PropTypes.func,
  isSaved: PropTypes.bool,
  itemKey: PropTypes.string,
  saveEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
  toggleStar: PropTypes.func,
  setModalPosition: PropTypes.func
};
