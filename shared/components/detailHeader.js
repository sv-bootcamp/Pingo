import React, { PropTypes, Component } from 'react';
import { View, Image, Text, TouchableHighlight, Platform } from 'react-native';
import {Actions} from 'react-native-router-flux';

const styles = {
  wrapper: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7'
  },
  btn_close: {
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
      }
    }),
    fontSize: 14,
    fontWeight: 'bold'
  }
};

export default class DetailHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {styles.wrapper}>
        <View style = {styles.btn_close}>
          <TouchableHighlight
            onPress = {()=>{
              this.props.setCurrentScene(this.props.lastScene);
              Actions.pop();
            }}>
            <Image source = {require('../resources/btn_close/drawable-mdpi/btn_close.png')}/>
          </TouchableHighlight>
        </View>
        <View style = {styles.info}>
          <Text style = {styles.title}> {this.props.title} </Text>
          {(this.props.date) ? <Text> {this.props.date} </Text> : null}
        </View>
          <View style = {styles.btn_star}>
              <TouchableHighlight>
                <Image source = {require('../resources/btn_star/drawable-mdpi/btn_star.png')}/>
              </TouchableHighlight>
          </View>
          <View style = {{flex: 19.2}}/>
          <View style = {styles.btn_more}>
              <TouchableHighlight>
                <Image source = {require('../resources/btn_more/drawable-mdpi/btn_more.png')}/>
              </TouchableHighlight>
          </View>
          <View style = {{flex: 6}}/>
      </View>
    );
  }
}

DetailHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  setCurrentScene: PropTypes.function,
  lastScene: PropTypes.string
};
