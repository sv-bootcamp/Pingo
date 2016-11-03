import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  Image
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
      <SmallHeader
        btnRight={this.renderImageButtonSetting()}
        handleBtnLeft={this.handleButtonPrev.bind(this)}
        handleBtnRight={()=>{}}
        headerText={'myPage'}
      />
    );
  }
}

MyPage.propTypes = {
  setCurrentScene: PropTypes.func
};

export default MyPage;
