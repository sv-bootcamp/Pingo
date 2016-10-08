import React, {PropTypes, Component} from 'react';
import {View} from 'react-native';
import HeaderLayout from './headerLayout';
import ListLayout from './listLayout';

export default class Second extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderLayout
            onForward={ () => {
              if(this.props.route.index > 0) {
                this.props.navigator.pop();
              }
            }
            }
          />
        </View>
        <View style={{flex: 7}}>
          <ListLayout />
        </View>
      </View>
    );
  }
}

Second.propTypes = {
    route: PropTypes.any,
    navigator: PropTypes.any
};
