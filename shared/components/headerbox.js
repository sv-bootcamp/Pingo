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

  _renderHeader(props) {
    return <TabBarTop {...props}/>;
  }

  render() {
    return (
      <View style={{flexDirection:'column', flex: 1}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
              style={{margin: 1, backgroundColor: 'red', flex: 1}}
              onPress={
                //todo: callback func of routing to MyPage goes here
                this.props.onForward
              }>
            <Text style={styles.text}>switch</Text>
          </TouchableOpacity>
          <Text style={{flex: 3, textAlign: 'center', fontSize: 20}}>AROUND</Text>
          <TouchableOpacity
              style={{margin: 1, backgroundColor: 'blue', flex: 1}}
              onPress={this.props.onForward}>
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
              return <TabViewPage {...props} renderScene={()=>{}}/>
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
  tabview_index: PropTypes.any,
  tabview_routes: PropTypes.any
};