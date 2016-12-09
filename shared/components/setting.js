import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { removeUserToken, removeLoginType } from '../actions/authActions';
import {FBLoginManager} from 'react-native-facebook-login';

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
    marginLeft: 16,
    fontSize: 16
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
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  },
  myPageTextLogInFacebook: {
    fontSize: 16,
    color: '#2c8cff',
    marginLeft: 16
  }
};

class Setting extends Component {
  constructor(props) {
    super(props);
    this.renderSettingListBoxLeftButton = this.renderSettingListBoxLeftButton.bind(this);
    this.renderSettingList = this.renderSettingList.bind(this);
    this.renderSignOut = this.renderSignOut.bind(this);
    this.renderGuestView = this.renderGuestView.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  renderSettingListBoxLeftButton(textLeft, handleButton) {
    return (
      <View style={styles.settingListBox}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={handleButton}
          >
            <Text style={[styles.settingTextList, styles.fontRobotoRegular]}>{textLeft}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderSettingGreyBox(text, height) {
    return (
      <View style={[styles.settingGreyBox, {height: height}]}>
        <Text style={[
          {marginLeft: 16, position: 'absolute', bottom: 8, fontSize: 14, color: '#8e8e8e'},
          styles.fontRobotoRegular]}>
          {text}
        </Text>
      </View>
    );
  }

  handleLogout() {
    FBLoginManager.logout((error, data) => {
      if (!error) {
        this.props.setToken('');
        removeUserToken();
        removeLoginType();
      } else {
        console.log(error, data);
      }
    });
  }

  renderSignOut() {
    return (
      <View>
        <View style={[styles.settingGreyBox, {height: 16}]}/>
        <TouchableOpacity
          style={[styles.settingListBox, {backgroundColor: 'white'}]}
          onPress={this.handleAlertSignOut.bind(this)}
        >
          <Text style={styles.myPageTextLogInFacebook}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleAlertSignOut() {
    const msg = 'Are you sure you want to sign out?';
    Alert.alert(
      'Sign out of Pingo?',
      msg,
      [
        {text: 'Cancel'},
        {text: 'Sign out', onPress: () => this.handleLogout()}
      ]
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

  renderPrivacyPolicy() {
    Actions.privacyPolicy();
  }

  renderSettingList() {
    return (
      <ScrollView style={{backgroundColor: '#e7e7e7', flex: 1}}>
        {this.renderSettingGreyBox('Map', 35)}
        {this.renderSettingListBox('Viewing Preference', 'Recent', this.handleSettingRecent.bind(this))}
        {this.renderSettingListBox('AUTO Refresh Using WIFI Only', 'Off', this.handleSettingOff.bind(this))}
        {this.renderSettingListBox('City', 'San Francisco', this.handleSettingCityName.bind(this))}
        {(this.props.token !== 'guest' && this.props.token !== '') ?
          <View>
            {this.renderSettingGreyBox('Account', 35)}
            {this.renderSettingListBox('Change Name', '', ()=>{})}
            {this.renderSettingListBox('Linked Account', '', ()=>{})}
          </View>
          : null}
        <View style={[styles.settingGreyBox, {height: 16}]}/>
        {this.renderSettingListBoxLeftButton('Privacy & Terms', this.renderPrivacyPolicy.bind(this))}
        {this.renderSettingListBox('Help', '', ()=>{})}
        {this.renderSettingListBox('Send Feedback', '', ()=>{})}
        {(this.props.token !== 'guest' && this.props.token !== '') ? this.renderSignOut() : this.renderGuestView()}
        <View style={[styles.settingGreyBox, {height: 42}]}>
          <Text style={{marginLeft: 16, color: '#8e8e8e'}}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
        <SmallHeader
          btnRight={<View/>}
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
  setToken: PropTypes.func,
  token: PropTypes.string
};

export default Setting;
