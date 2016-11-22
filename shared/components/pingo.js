import React, {PropTypes, Component} from 'react';
import {Image, View, Dimensions, Animated, Easing} from 'react-native';
import ImgPingo from '../resources/logo/pingo.png';
import { Actions } from 'react-native-router-flux';
import { getLoginType, getRefreshToken, requestRefreshTokenFacebook, getAccessToken, removeLoginType } from '../actions/authActions';

const styles = {
  fadeOut: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white'
  }
};
import { removeAllDev } from '../actions/authActions';
export default class Pingo extends Component {
  constructor(props) {
    super(props);
    this.animationFadeOut = this.animationFadeOut.bind(this);
    this.state = {
      opacity: new Animated.Value(0)
    };
  }
  componentDidMount() {
    removeAllDev().done();
    getLoginType().then((data) => {
      if (data === 'facebook') {
        getRefreshToken().then((refreshToken) => {
          if (refreshToken === null) {
            return null;
          }
          console.log(refreshToken);
          return requestRefreshTokenFacebook(refreshToken);
        })
        .then(() => {
          getAccessToken().then((accessToken) => {
            console.log(accessToken);
            if (accessToken !== null) {
              this.props.setToken(accessToken);
              this.props.setCurrentScene('map');
              Actions.map({type: 'replace'});
            } else {
              removeLoginType();
              this.animationFadeOut();
              this.props.setCurrentScene('initialScene');
            }
          });
        });
      } else {
        this.animationFadeOut();
        this.props.setCurrentScene('initialScene');
      }
    });
  }
  animationFadeOut() {
    this.state.opacity.setValue(0);
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 2300,
        easing: Easing.quad
      }
    ).start(()=>Actions.initialScene({type: 'replace'}));
  }
  render() {
    const opacity = this.state.opacity.interpolate({
      inputRange: [0, 0.5, 0.7, 1],
      outputRange: [0, 0, 0, 1]
    });
    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.fadeOut, {
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          opacity: opacity}]}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={ImgPingo} />
        </View>
      </View>
    );
  }
}

Pingo.propTypes = {
  setCurrentScene: PropTypes.func,
  setToken: PropTypes.func
};
