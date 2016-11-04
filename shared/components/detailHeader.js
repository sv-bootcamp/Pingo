import React, { PropTypes, Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class DetailHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Text> {this.props.title}</Text>
          {(this.props.date) ? <Text> {this.props.date} </Text> : null}
        </View>
        <View>
          <TouchableHighlight
            onPress = {()=>{
              this.props.setCurrentScene(this.props.lastScene);
              Actions.pop();
            }}>
            <Image source = {require('../resources/btn_close/drawable-mdpi/btn_close.png')}/>
          </TouchableHighlight>
        </View>
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
