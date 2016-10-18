import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TabViewAnimated, TabViewPage, TabBarTop} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';

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
  }

  _renderHeader(props) {
    return <TabBarTop {...props}/>;
  }

  _onForward() {
    if (this.props.currentScene === 'map') {
      Actions.list();
    }
    else if (this.props.currentScene === 'list') {
      Actions.map();
    }
  }

  render() {
    if (this.props.currentScene === 'map' || this.props.currentScene === 'list') {
      return (
          <View style= {{flexDirection:'column', flex: 1}}>
            <View style= {{flexDirection:'row' }}>
              <TouchableOpacity
                style={{margin: 1, backgroundColor: 'red', flex: 1}}
              >
                <Text style={styles.text}>myPage</Text>
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
  categorizeItems: PropTypes.func,
  setTabViewIndex: PropTypes.func,
  tabview_index: PropTypes.any,
  tabview_routes: PropTypes.any,
  currentScene: PropTypes.string
};
