import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, Platform, Animated, Easing} from 'react-native';
import {TabViewAnimated, TabBarTop} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';

import IMG_BUTTON_MYPAGE from '../resources/header/btn_mypage.png';
import IMG_BUTTON_REFRESH from '../resources/header/btn_refresh.png';
import IMG_BUTTON_SWITCH_MAP from '../resources/header/btn_switch_map.png';
import IMG_BUTTON_SWITCH_LIST from '../resources/header/btn_switch_list.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  text: {
    flex: 1,
    fontSize: 17,
    marginRight: 0,
    marginLeft: 0,
    marginTop: 24,
    marginBottom: 10,
    color: '#2b2b2b',
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  },
  buttonMyPage: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    marginRight: 16,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10
  },
  buttonRefresh: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    marginRight: 0,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10
  },
  buttonList: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    marginRight: 16,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10
  },
  image: {
    height: 24,
    width: 24
  }
});

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchButton = this.handleSwitchButton.bind(this);
    this.renderHeaderTabBar = this.renderHeaderTabBar.bind(this);
    this.spin = this.spin.bind(this);
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }
  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start();
  }
  componentDidMount() {
    this.spin();
  }
  renderHeaderTabBar(props) {
    return (<TabBarTop
      {...props}
      renderLabel={(routes) =>
        <Text style={{ margin: 0, color: '#8e8e8e' }}>{routes.route.title}</Text>
      }
      style={{backgroundColor: 'white'}}
      indicatorStyle={{backgroundColor: '#2b2b2b'}}
    />);
  }
  handleSwitchButton() {
    if (this.props.currentScene === 'map') {
      this.props.showListCard();
      this.props.setCurrentScene('list');
      Actions.list();
    } else if (this.props.currentScene === 'list') {
      if (this.props.selectedItem.title === undefined) {
        this.props.hideMapCard();
      }
      this.props.setCurrentScene('map');
      Actions.pop();
    }
  }
  handleRefreshButton() {
    // todo: implement refresh button handling function here
    this.spin();
  }
  handleButtonMyPage() {
    this.props.setCurrentScene('myPage');
    Actions.myPage({type: 'replace'});
  }
  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    if (this.props.currentScene === 'map' || this.props.currentScene === 'list') {
      return (
        <View style= {{ flexDirection: 'column', backgroundColor: 'white', elevation: 3 }}>
          <View style= {{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.buttonMyPage}
              onPress={this.handleButtonMyPage.bind(this)}
            >
              <Image
                style={styles.image}
                source={IMG_BUTTON_MYPAGE}
              />
            </TouchableOpacity>
            <Text style={styles.text}>{this.props.currentCity}</Text>
            <TouchableOpacity
                style={styles.buttonRefresh}
                onPress={this.handleRefreshButton.bind(this)}>
              <Animated.Image
                style={[styles.image, {transform: [{rotate: spin}]}]}
                source={IMG_BUTTON_REFRESH}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonList}
              onPress={this.handleSwitchButton.bind(this)}>
              <Image
                style={styles.image}
                source={(this.props.currentScene === 'map') ? IMG_BUTTON_SWITCH_MAP : IMG_BUTTON_SWITCH_LIST}
              />
            </TouchableOpacity>
          </View>
          <TabViewAnimated
            style={styles.container}
            navigationState={{
              index: this.props.tabviewIndex,
              routes: this.props.tabviewRoutes
            }}
            renderScene={()=>{}}
            renderHeader={this.renderHeaderTabBar}
            onRequestChangeTab={
              (index) => {
                this.props.setTabViewIndex(index);
                switch (index) {
                case 0:
                  this.props.categorizeItems('SHOW_ALL');
                  return;
                case 1:
                  this.props.categorizeItems('EVENTS');
                  return;
                case 2:
                  this.props.categorizeItems('FACILITIES');
                  return;
                case 3:
                  this.props.categorizeItems('WARNING');
                  return;
                default:
                  return;
                }
              }
            }
          />
        </View>
      );
    }
    return null;
  }
}

MainHeader.propTypes = {
  hideMapCard: PropTypes.any,
  showListCard: PropTypes.any,
  selectedItem: PropTypes.any,
  categorizeItems: PropTypes.func,
  setTabViewIndex: PropTypes.func,
  setCurrentScene: PropTypes.func,
  tabviewIndex: PropTypes.any,
  tabviewRoutes: PropTypes.any,
  currentScene: PropTypes.string,
  currentCity: PropTypes.string
};
