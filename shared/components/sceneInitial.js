import React, {PropTypes, Component} from 'react';
import {Platform, StyleSheet, View, Navigator} from 'react-native';
import FirstLayout from '../containers/SceneMapLayout';
import HeaderLayout from '../containers/headerLayout';
import Second from './sceneList';

export default class SceneInitial extends Component {
  render() {
    this.props.setNavigator(this.props.navigator);
    return (
      <View style={styles.totalView}>
        <View style={{flex: 1.25, backgroundColor: 'white'}}>
          <HeaderLayout/>
        </View>
        <View style={{flex: 7}}>
          <Navigator
            initialRoute={{index: 0}}
            renderScene={this.navigatorRenderScene}
          />
        </View>
      </View>
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.index) {
    case 0:
      return (
        <FirstLayout route={route} navigator={navigator}/>
      );
    case 1:
      return (<Second route={route} navigator={navigator}/>);
    default:
      return (<FirstLayout route={route} navigator={navigator}/>);
    }
  }
}

const styles = StyleSheet.create({
  totalView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 20,
      }
    })
  }
});

SceneInitial.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any,
  setRoute: PropTypes.func,
  setNavigator: PropTypes.func
};
