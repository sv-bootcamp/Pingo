import React, {PropTypes, Component} from 'react';
import {Image, View} from 'react-native';
import ImgPingo from '../resources/logo/pingo.png';
import { Actions } from 'react-native-router-flux';
import { getLoginType } from '../actions/authActions';
import TimerMixin from 'react-timer-mixin';

export default class Pingo extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    getLoginType().then((data) => {
      if (data === 'facebook') {
        this.props.setToken(data);
        this.props.setCurrentScene('map');
        Actions.map({type: 'replace'});
      } else {
        TimerMixin.setTimeout(()=> {
          this.props.setCurrentScene('initialScene');
          Actions.initialScene({type: 'replace'});
        }, 1000);
      }
    });
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={ImgPingo} />
      </View>
    );
  }
}

Pingo.propTypes = {
  setCurrentScene: PropTypes.func,
  setToken: PropTypes.func
};
