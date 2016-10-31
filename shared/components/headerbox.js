import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image, Platform} from 'react-native';
import {TabViewAnimated, TabBarTop} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';

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
      }
    })
  },
  button_myPage: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    marginRight: 16,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10
  },
  button_refresh: {
    height: 24,
    width: 24,
    backgroundColor: 'white',
    marginRight: 0,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10
  },
  button_list: {
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

export default class Headerbox extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  _renderHeader(props) {
    return (<TabBarTop
      {...props}
      renderLabel={(routes) =>
        <Text style={{ margin: 0, color: '#8e8e8e' }}>{routes.route.title}</Text>
      }
      style={{backgroundColor: 'white'}}
      indicatorStyle={{backgroundColor: '#2b2b2b'}}
    />);
  }
  _onForward() {
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

  _onRefresh() {
    // todo: implement refresh button handling function here
  }

  render() {
    if (this.props.currentScene === 'map' || this.props.currentScene === 'list') {
      return (
        <View style= {{ flexDirection: 'column', backgroundColor: 'white' }}>
          <View style= {{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.button_myPage}
            >
              <Image
                style={styles.image}
                source={require('../resources/header/btn_mypage.png')}
              />
            </TouchableOpacity>
            <Text style={styles.text}>San Francisco</Text>
            <TouchableOpacity
                style={styles.button_refresh}
                onPress={this._onRefresh}>
              <Image
                style={styles.image}
                source={require('../resources/header/btn_refresh.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button_list}
              onPress={this._onForward.bind(this)}>
              <Image
                style={styles.image}
                source={require('../resources/header/btn_list.png')}
              />
            </TouchableOpacity>
          </View>
          <TabViewAnimated
            style={styles.container}
            navigationState={{
              index: this.props.tabview_index,
              routes: this.props.tabview_routes
            }}
            renderScene={()=>{}}
            renderHeader={this._renderHeader}
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

Headerbox.propTypes = {
  hideMapCard: PropTypes.any,
  showListCard: PropTypes.any,
  selectedItem: PropTypes.any,
  categorizeItems: PropTypes.func,
  setTabViewIndex: PropTypes.func,
  setCurrentScene: PropTypes.func,
  tabview_index: PropTypes.any,
  tabview_routes: PropTypes.any,
  currentScene: PropTypes.string
};
