import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoginFacebookLayout from '../containers/loginFacebookLayout';

const styles = {
  settingListBox: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#e7e7e7',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingGreyBox: {
    backgroundColor: '#e7e7e7',
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingTextList: {
    color: '#2b2b2b',
    marginLeft: 16
  },
  settingTextRightButton: {
    fontSize: 16,
    color: '#2c8cff',
    alignSelf: 'flex-end',
    marginRight: 16
  },
  fontRobotoRegular: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  },
  myPageTextLogInFacebook: {
    color: '#2c8cff',
    marginLeft: 16
  }
};

class Setting extends Component {
  constructor(props) {
    super(props);
    this.renderSettingList = this.renderSettingList.bind(this);
    this.renderSignOut = this.renderSignOut.bind(this);
    this.renderGuestView = this.renderGuestView.bind(this);
  }
  handleButtonPrev() {
    this.props.setCurrentScene('myPage');
    Actions.myPage({type: 'replace'});
  }

  renderSettingListBox(textLeft, textRight, handleButton) {
    return (
    <View style={styles.settingListBox}>
      <View style={{flex: 2}}>
        <Text style={[styles.settingTextList, styles.fontRobotoRegular]}>{textLeft}</Text>
      </View>
      <View style={{flex: 1}}>
        {(textRight === '') ? null :
          <TouchableOpacity
            onPress={handleButton}
          >
            <Text style={[styles.settingTextRightButton, styles.fontRobotoRegular]}>{textRight}</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
    );
  }

  renderSettingGreyBox(text, height) {
    return (
      <View style={[styles.settingGreyBox, {height: height}]}>
        <Text style={{marginLeft: 16, position: 'absolute', bottom: 8}}>{text}</Text>
      </View>
    );
  }

  renderSignOut() {
    return (
      <LoginFacebookLayout/>
    );
  }

  handleSettingRecent() {
    // todo
  }

  handleSettingOff() {
    // todo
  }

  handleSettingCityName() {
    // todo
  }

  renderGuestView() {
    // todo
  }

  renderSettingList() {
    return (
      <ScrollView style={{backgroundColor: '#e7e7e7', flex: 1}}>
        {this.renderSettingGreyBox('Map', 42)}
        {this.renderSettingListBox('Viewing Preference', 'Recent', this.handleSettingRecent.bind(this))}
        {this.renderSettingListBox('AUTO Refresh Using WIFI Only', 'Off', this.handleSettingOff.bind(this))}
        {this.renderSettingListBox('City', 'San Francisco', this.handleSettingCityName.bind(this))}
        {(this.props.token !== '') ?
          <View>
            {this.renderSettingGreyBox('Account', 42)}
            {this.renderSettingListBox('Change Name', '', ()=>{})}
            {this.renderSettingListBox('Linked Account', '', ()=>{})}
          </View>
          : null}
        <View style={[styles.settingGreyBox, {height: 24}]}/>
        {this.renderSettingListBox('Privacy & Terms', '', ()=>{})}
        {this.renderSettingListBox('Help', '', ()=>{})}
        {this.renderSettingListBox('Send Feedback', '', ()=>{})}
        {(this.props.token !== '') ? this.renderSignOut() : this.renderGuestView()}
        <View style={[styles.settingGreyBox, {height: 42}]}>
          <Text style={{marginLeft: 16}}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <SmallHeader
          btnRight={null}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={()=>{}}
          headerText='Settings'/>
        {this.renderSettingList()}
      </View>
    );
  }
}

Setting.propTypes = {
  setCurrentScene: PropTypes.func,
  token: PropTypes.string
};

export default Setting;
