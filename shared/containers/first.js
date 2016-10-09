import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import MapLayout from './mapLayout';
import HeaderLayout from './headerLayout';

export default class First extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderLayout
            onForward={ () => {
              const nextIndex = this.props.route.index + 1;
              this.props.navigator.push({
                index: nextIndex
              });
            }
            }
          />
        </View>
        <View style={{flex: 7}}>
          <MapLayout
            navigator={this.props.navigator}
          />
        </View>
      </View>
    );
  }
}

First.propTypes = {
  route: PropTypes.any,
  navigator: PropTypes.any
};
