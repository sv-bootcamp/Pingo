import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TabViewAnimated, TabViewPage, TabBarTop} from 'react-native-tab-view';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default class Headerbox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._onForward = this._onForward.bind(this);
    this._onForwardMyPage = this._onForwardMyPage.bind(this);
  }

  _renderHeader(props) {
    return <TabBarTop {...props}/>;
  }

  _onForward() {
    if (this.props.sceneIndex === 0) {
      this.props.setSceneIndex(1);
    } else {
      this.props.setSceneIndex(0);
    }
    return this.props.onForward(
      this.props.sceneIndex,
      this.props.navigator
    );
  }

  _onForwardMyPage() {
    if (this.props.myPageSceneIndex === 0) {
      this.props.setMyPageSceneIndex(1);
    } else {
      this.props.setMyPageSceneIndex(0);
    }
    return this.props.onForward(
      this.props.myPageSceneIndex,
      this.props.myPageNavigator
    );
  }

  render() {
    return (
      <View style= {{flexDirection:'column', flex: 1}}>
        <View style= {{flexDirection:'row' }}>
          <TouchableOpacity
              style={{margin: 1, backgroundColor: 'red', flex: 1}}
              onPress={this._onForwardMyPage}>
            <Text style={styles.text}>switch</Text>
          </TouchableOpacity>
          <Text style={{flex: 3, textAlign: 'center', fontSize: 20}}>AROUND</Text>
          <TouchableOpacity
              style={{margin: 1, backgroundColor: 'blue', flex: 1}}
              onPress={this._onForward}>
            <Text style={styles.text}>switch</Text>
          </TouchableOpacity>
        </View>
        <TabViewAnimated
          style={styles.container}
          navigationState={{
            index: this.props.tabview_index,
            routes: this.props.tabview_routes
          }}
          renderScene={(props) => {
            return <TabViewPage {...props} renderScene={()=>{}}/>;
          }
          }
          renderHeader={this._renderHeader}
          onRequestChangeTab={(index) => {
            this.props.setTabViewIndex(index);
            switch (index) {
            case 0:
              this.props.categorizeItems('SHOW_ALL');
              return;
            case 1:
              this.props.categorizeItems('A');
              return;
            case 2:
              this.props.categorizeItems('B');
              return;
            case 3:
              this.props.categorizeItems('C');
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
}

Headerbox.propTypes = {
  categorizeItems: PropTypes.func,
  setTabViewIndex: PropTypes.func,
  onForward: PropTypes.func,
  setRoute: PropTypes.func,
  setSceneIndex: PropTypes.func,
  setMyPageSceneIndex: PropTypes.func,
  tabview_index: PropTypes.any,
  tabview_routes: PropTypes.any,
  route: PropTypes.any,
  navigator: PropTypes.any,
  sceneIndex: PropTypes.any,
  myPageSceneIndex: PropTypes.any,
  myPageNavigator: PropTypes.any
};
