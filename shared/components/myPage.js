import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  Image,
  Text,
  Platform,
  ListView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {TabViewAnimated, TabBarTop} from 'react-native-tab-view';
import CardLayout from '../containers/cardLayout';
import LoginFacebookLayout from '../containers/loginFacebookLayout';
import LoadingLayout from '../containers/loadingLayout';
import { getLoginType, getUserInformation, getUserKey, getAccessToken } from '../actions/authActions';
import ImgBtnSetting from '../resources/smallHeader/btnSetting.png';
import ImgGuest from '../resources/myPage/guest.png';
import IMG_BUTTON_RED_FLAG from '../resources/btn_flag_red/drawable-mdpi/btn_flag.png';
import IMG_BUTTON_EDIT from '../resources/btn_edit/btn_edit.png';

const styles = {
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
  address: {
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  option: {
    fontSize: 14,
    color: '#828282',
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
  textNothingFound: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#8e8e8e'
  },
  TextTitle: {
    fontSize: 19,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  }
};

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.renderTabViewContents = this.renderTabViewContents.bind(this);
    this.renderTabView = this.renderTabView.bind(this);
    this.renderTextNothingFound = this.renderTextNothingFound.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.renderActivityCard = this.renderActivityCard.bind(this);
    this.transformTodate = this.transformTodate.bind(this);
    this.renderActivityInfo = this.renderActivityInfo.bind(this);
    this.renderEventOption = this.renderEventOption.bind(this);
    getAccessToken().then((accessToken) => {
      if (accessToken !== null) {
        getUserKey().then((userKey) => {
          if (userKey !== null) {
            // TODO: now it gets user information every time. improve this
            getUserInformation(userKey, accessToken).then((rjson) => {
              if (rjson) {
                this.props.setUserName(rjson.name);
                this.props.setUserEmail(rjson.email);
                this.props.setProfileImgUrl(rjson.profileImgUrl);
              }
            });
          }
        });
      }
    });
    this.state = {
      imageHeight: 0,
      tabViewWrapperHeight: 0
    };
  }

  componentDidMount() {
    getLoginType().then((data) => {
      if (data === null) {
        this.props.setToken('');
      } else {
        this.props.setToken(data);
      }
    });
    this.props.getSavedPosts();
    this.props.getCreatedPosts();
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
    this.props.setCurrentScene('setting');
    Actions.setting({type: 'replace'});
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

  handleTextLayout(evt) {
    this.setState({imageHeight: evt.nativeEvent.layout.height});
  }

  handleTabViewWrapperLayout(evt) {
    this.setState({tabViewWrapperHeight: evt.nativeEvent.layout.height});
  }

  renderUserPicture() {
    return (
      <View style={{flexDirection: 'row', flex: 24 + 72 + 16}}>
        <View style={{flex: 24}}/>
        <View style={{flex: 88}} onLayout={this.handleTextLayout.bind(this)}>
          <Image
            style={{height: this.state.imageHeight, width: this.state.imageHeight, borderRadius: 5}}
            source={(
                    this.props.profileImgUrl !== '' &&
                    this.props.token !== '' &&
                    this.props.token !== 'guest') ?
            {uri: this.props.profileImgUrl} : ImgGuest}
          />
        </View>
      </View>
    );
  }

  renderTextAfterLogin(text) {
    return (
      <View>
        <Text style={[styles.myPageTextLogInFacebook, styles.fontRobotoRegular]}>
          {text}
        </Text>
      </View>
    );
  }

  renderTextBoxInUserBox() {
    return (
      <View style={{flexDirection: 'column', flex: 225}}>
        <View style={{flex: 35}}>
          <Text style={[styles.myPageTextUserName, styles.fontRobotoMedium]}>
            {(
              this.props.userName !== '' &&
              this.props.token !== '' &&
              this.props.token !== 'guest') ?
              this.props.userName :
              'Guest'
            }
          </Text>
        </View>
        <View style={{flex: 8}}/>
        <View style={{flex: 28}}>
          {(this.props.token !== '' && this.props.token !== 'guest') ?
            this.renderTextAfterLogin('Change Profile Photo') :
            <LoginFacebookLayout/>
          }
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
        renderScene={this.renderTabViewContents.bind(this)}
        renderHeader={this.renderTabViewHeader}
        onRequestChangeTab={
          (index) => {
            this.props.setMyPageTabViewIndex(index);
          }
        }/>
    );
  }

  renderTextNothingFound(text) {
    const textHeight = 17;
    const tabViewWrapperHeightRatio = 446.5;
    const tabViewContentsHeightRatio = 405;
    return (
      <Text style={[
        styles.textNothingFound,
        {top: this.state.tabViewWrapperHeight *
        (tabViewContentsHeightRatio / 2) / tabViewWrapperHeightRatio - textHeight / 2}]}>
        {text}
      </Text>
    );
  }

  renderTabViewContents({ route }) {
    if (route.key === '2') {
      if (this.props.token !== '' &&
        this.props.token !== 'guest' &&
        this.props.savedPosts.length !== 0 &&
        !this.props.savedPosts.error) {
        let dataSource = this.props.savedPosts.map((post) => {
          return (
            Object.assign(post, {isSaved: true})
          );
        });
        return (
          <ListView
            dataSource={
            new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows(dataSource)
          }
            renderRow={(rowData) => <CardLayout dataSource = {rowData} style={{}} myPageTabViewIndex={1}/>}
            enableEmptySections={true}
            removeClippedSubviews={false}
          />
        );
      }
      return (
        this.renderTextNothingFound('Nothing Found')
      );
    }
    if (route.key === '1') {
      if (this.props.token !== '' &&
        this.props.token !== 'guest' &&
        this.props.createdPosts &&
        this.props.createdPosts.length !== 0
        && !this.props.createdPosts.error) {
        return (
          <ListView
            dataSource={
            new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            }).cloneWithRows(this.props.createdPosts)
          }
            renderRow={this.renderActivityCard}
            enableEmptySections={true}
            removeClippedSubviews={false}
          />
        );
      } else if (this.props.token === '' || this.props.token === 'guest') {
        return (
          this.renderTextNothingFound('Please Login to add items here')
        );
      }
      return (
        this.renderTextNothingFound('Nothing Found')
      );
    }
    return null;
  }

  renderActivityInfo(rowData) {
    return (
      <View style = {{height: 107}}>
        <View style={{flex: 19, justifyContent: 'flex-start'}}>
          <Text style = {styles.TextTitle}>{rowData.title}</Text>
        </View>
        <View style={{flex: 8}}/>
        <View style={{
          flex: 14,
          justifyContent: 'center'}}>
          <Text numberOfLines={1}
                style={styles.address}>{rowData.address}</Text>
        </View>
        <View style={{flex: 8}}/>
        <View style={{flex: 14}}>
          <Text>{this.transformTodate(rowData)}</Text>
        </View>
        <View style={{flex: 8}}/>
        { (rowData.category === 'event') &&
            <View style = {{flex: 14}}>
              <Text style = {{flex: 14}}>Created by me</Text>
            </View>
        }
        <View style={{flex: 8}}/>
      </View>
    );
  }

  renderActivityCard(rowData) {
    return (
      <View style = {{height: 490.5, borderBottomColor: '#e7e7e7', borderBottomWidth: 1}}>
        <View style = {{flexDirection: 'row', flex: 1}}>
          <View style = {{flex: 16}}/>
          <View style = {{flex: 344}}>
            <View style = {{flex: 32}}/>
            {this.renderActivityInfo(rowData)}
            {(rowData.category === 'event') && this.renderEventOption()}
            <View style = {{flex: 176}}>
              <ListView
                dataSource={new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
                }).cloneWithRows(rowData.images)}
                renderRow={this.renderImg.bind(this)}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                removeClippedSubviews={false}
              />
            </View>
            {this.renderPhotoOption()}
          </View>
        </View>
      </View>
    );
  }

  renderImg(rowData) {
    return (
      <TouchableOpacity onPress={()=>{
      }}>
        <Image style={{width: 328, height: 176}}
               source = {{uri: rowData.imageUrl}}/>
      </TouchableOpacity>
    );
  }

  renderPhotoOption() {
    return (
      <View style = {{flex: 64}}>
        <View style = {{flex: 1}}/>
        <View style = {{flex: 3, flexDirection: 'row'}}>
          <View style = {{flex: 24}}>
            <Image source = {IMG_BUTTON_RED_FLAG} style = {{width: 24, height: 24}}/>
          </View>
          <View style = {{flex: 10}}/>
          <View style = {{flex: 328}}>
            <View style = {{flex: 1 }}>
              <Text style = {styles.option}>Photo Reported</Text>
            </View>
            <View style = {{flex: 1}}/>
            <View style = {{flex: 0.5}}/>
          </View>
        </View>
      </View>
    );
  }

  renderEventOption() {
    return (
      <View style = {{flex: 111}}>
        <View style = {{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <View style = {{flex: 16}}>
            <Image source = {IMG_BUTTON_EDIT} style = {{width: 16, height: 16}}/>
          </View>
          <View style = {{flex: 15.5}}/>
          <View style = {{flex: 296}}>
            <Text style = {styles.option}>Edit Suggestion</Text>
          </View>
        </View>
        <View style = {{flex: 1, flexDirection: 'row'}}>
          <View style = {{flex: 24}}>
            <Image source = {IMG_BUTTON_RED_FLAG} style = {{width: 24, height: 24}}/>
          </View>
          <View style = {{flex: 10}}/>
          <View style = {{flex: 328}}>
            <View style = {{flex: 1 }}>
              <Text style = {styles.option}>Event Reported</Text>
            </View>
            <View style = {{flex: 1}}/>
            <View style = {{flex: 1}}/>
          </View>
        </View>
      </View>
    );
  }

  renderTabViewHeader(props) {
    return (<TabBarTop
      {...props}
      renderLabel={(routes) =>
        <Text style={[styles.fontRobotoMedium, { fontSize: 14, color: '#2b2b2b' }]}>{routes.route.title}</Text>
      }
      style={{
        backgroundColor: 'white',
        flex: 0.1,
        ...Platform.select({
          android: {
            elevation: 1
          }
        })
      }}
      indicatorStyle={{backgroundColor: '#2b2b2b'}}
    />);
  }

  renderModal() {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 136 / (440 + 136) + 64 + 22,
          zIndex: 100,
          position: 'absolute',
          top: 0
        }}
        onPress = {() => this.props.toggleModalVisible()}/>
    );
  }

  transformTodate(rowData) {
    let startTime = new Date(rowData.startTime);
    let endTime = '';
    if (rowData.endTime) {
      endTime = new Date(rowData.endTime);
    }
    let date = '';
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    let meridiem = 'am';
    let hour = startTime.getHours();
    if (hour === 0) {
      hour = 12;
    } else if (hour === 12) {
      meridiem = 'pm';
    } else if (hour > 12) {
      hour %= 12;
      meridiem = 'pm';
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    let minute = startTime.getMinutes();
    if (minute === 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    date += monthNames[startTime.getMonth()] + '. ' + startTime.getDate() + ', ';
    date += hour + ':' + minute + meridiem + ' - ';
    if (endTime) {
      meridiem = 'am';
      hour = endTime.getHours();
      if (hour === 0) {
        hour = 12;
      } else if (hour === 12) {
        meridiem = 'pm';
      } else if (hour > 12) {
        hour %= 12;
        meridiem = 'pm';
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      minute = endTime.getMinutes();
      if (minute === 0) {
        minute = '00';
      } else if (minute < 10) {
        minute = '0' + minute;
      }
      date += hour + ':' + minute + meridiem;
    } else {
      date += '?';
    }
    return date;
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
        <SmallHeader
          btnRight={this.renderImageButtonSetting()}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={this.handleButtonSetting.bind(this)}
          headerText={'My Page'}
        />
        {this.renderUserBox()}
        {this.props.modalVisible && this.renderModal()}
        <View
          style={{backgroundColor: 'white', flex: 440, borderTopWidth: 1, borderTopColor: '#e7e7e7'}}
          onLayout={this.handleTabViewWrapperLayout.bind(this)}
        >
          {this.renderTabView()}

        </View>
        <LoadingLayout/>
      </View>
    );
  }
}

MyPage.propTypes = {
  setCurrentScene: PropTypes.func,
  setMyPageTabViewIndex: PropTypes.func,
  setToken: PropTypes.func,
  setUserName: PropTypes.func,
  setUserEmail: PropTypes.func,
  setProfileImgUrl: PropTypes.func,
  getCreatedPosts: PropTypes.func,
  myPageTabViewIndex: PropTypes.number,
  token: PropTypes.string,
  userName: PropTypes.string,
  profileImgUrl: PropTypes.string,
  myPageTabViewRoutes: PropTypes.any,
  items: PropTypes.any,
  getSavedPosts: PropTypes.func,
  savedPosts: PropTypes.any,
  createdPosts: PropTypes.array,
  toggleModalVisible: PropTypes.func,
  modalVisible: PropTypes.bool
};

export default MyPage;
