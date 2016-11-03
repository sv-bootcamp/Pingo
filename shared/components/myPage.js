import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {TabViewAnimated, TabBarTop} from 'react-native-tab-view';

import ImgBtnSetting from '../resources/smallHeader/btnSetting.png';

const styles = StyleSheet.create({
  myPageTextUserName: {
    position: 'absolute',
    bottom: 0,
    fontSize: 19,
    color: '#2b2b2b'
  },
  myPageTextLogInFacebook: {
    color: '#2c8cff'
  },
  myPageTabViewContainer: {
    flex: 1
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
  }
});

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

  handleButtonSetting() {
    // todo
  }

  renderUserBox() {
    return (
      <View style={{backgroundColor: 'white', flexDirection: 'column', flex: 136, elevation: 1}}>
        <View style={{backgroundColor: 'white', flex: 32}}/>
        <View style={{flexDirection: 'row', flex: 72}}>
          {this.renderUserPicture()}
          {this.renderTextBoxInUserBox()}
          <View style={{backgroundColor: 'white', flex: 24}}/>
        </View>
        <View style={{backgroundColor: 'white', flex: 32}}/>
      </View>
    );
  }
  renderUserPicture() {
    return (
      <View style={{flexDirection: 'row', flex: 24 + 72 + 16}}>
        <View style={{flex: 24}}/>
        <View style={{flex: 88}}>
          <Text>Picture</Text>
        </View>
      </View>
    );
  }

  renderTextBoxInUserBox() {
    return (
      <View style={{flexDirection: 'column', flex: 225}}>
        <View style={{flex: 35}}>
          <Text style={[styles.myPageTextUserName, styles.fontRobotoMedium]}>Guest</Text>
        </View>
        <View style={{flex: 8}}/>
        <View style={{flex: 28}}>
          <Text style={[styles.myPageTextLogInFacebook, styles.fontRobotoRegular]}>Log in with Facebook</Text>
        </View>
      </View>
    );
  }

  renderTabView() {
    return (
      <TabViewAnimated
        style={styles.myPageTabViewContainer}
        navigationState={{
          index: this.props.myPageTabViewIndex,
          routes: this.props.myPageTabViewRoutes
        }}
        renderScene={this.renderTabViewContents}
        renderHeader={this.renderTabViewHeader}
        onRequestChangeTab={
          (index) => {
            this.props.setMyPageTabViewIndex(index);
          }
        }/>
    );
  }

  renderTabViewContents() {
    // TBD
  }

  renderTabViewHeader(props) {
    return (<TabBarTop
      {...props}
      renderLabel={(routes) =>
        <Text style={[styles.fontRobotoMedium, { fontSize: 14, color: '#2b2b2b' }]}>{routes.route.title}</Text>
      }
      style={{backgroundColor: 'white', flex: 0.1}}
      indicatorStyle={{backgroundColor: '#2b2b2b'}}
    />);
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <SmallHeader
          btnRight={this.renderImageButtonSetting()}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={this.handleButtonSetting.bind(this)}
          headerText={'My Page'}
        />
        {this.renderUserBox()}
        <View style={{backgroundColor: 'white', flex: 440}}>
          {this.renderTabView()}
        </View>
      </View>
    );
  }
}

MyPage.propTypes = {
  setCurrentScene: PropTypes.func,
  setMyPageTabViewIndex: PropTypes.func,
  myPageTabViewIndex: PropTypes.number,
  myPageTabViewRoutes: PropTypes.any
};

export default MyPage;