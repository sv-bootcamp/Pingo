import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  Image,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ImgBtnSetting from '../resources/smallHeader/btnSetting.png';

class MyPage extends Component {
  constructor(props) {
    super(props);
  }
  renderImageButtonSetting() {
    return (
      <Image
        style={{height: 24, width: 24}}
        source={ImgBtnSetting}
      />
    );
  }
  handleButtonPrev() {
    this.props.setCurrentScene('map');
    Actions.map({type: 'replace'});
  }
  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <SmallHeader
          btnRight={this.renderImageButtonSetting()}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={()=>{}}
          headerText={'myPage'}
        />
        <View style={{backgroundColor: 'blue', flex: 1}}>
          <Text> testing </Text>
        </View>
        <View style={{backgroundColor: 'black', flex: 1}}>
          <Text> testing </Text>
        </View>
      </View>
    );
  }
}

MyPage.propTypes = {
  setCurrentScene: PropTypes.func
};

export default MyPage;
