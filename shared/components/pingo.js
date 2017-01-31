import React, {PropTypes, Component} from 'react';
import {Image, View, Dimensions, Animated, Easing, TouchableOpacity} from 'react-native';
import ImgPingo from '../resources/logo/pingo.png';
import ImgGoober from '../resources/goober.png';
import { Actions } from 'react-native-router-flux';
import { getLoginType, getRefreshToken, requestRefreshTokenFacebook, getAccessToken, removeLoginType } from '../actions/authActions';

const styles = {
  fadeOut: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white'
  }
};

const WIDTH = Dimensions.get('window').width;

export default class Pingo extends Component {
  constructor(props) {
    super(props);
    // this.animationFadeOut = this.animationFadeOut.bind(this);
    this.state = {
      clicked: 0,
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    getLoginType().then((data) => {
      if (data === 'facebook') {
        getRefreshToken().then((refreshToken) => {
          if (refreshToken === null) {
            return null;
          }
          return requestRefreshTokenFacebook(refreshToken);
        })
        .then(() => {
          getAccessToken().then((accessToken) => {
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
        // this.animationFadeOut();
        this.props.setCurrentScene('initialScene');
      }
    });
    navigator.geolocation.getCurrentPosition((position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.004724,
        longitudeDelta: 0.004023
      };
      this.props.setLocation(newLocation);
    },
    (err) => {
      console.log(err);
    });
  }

  animationFadeOut() {
    const { clicked } = this.state;
    if (clicked === 0) {
      this.setState({clicked: 1});
    } else if (clicked === 1) {
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
          {(this.state.clicked > 0) ?
            <Image source={ImgPingo} /> :
            <Image
              style={{
                width: WIDTH * 0.7,
                height: WIDTH * 0.7 * 510 / 1667
              }}
              source={ImgGoober}
            />}
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 10,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            top: 0,
            left: 0,
            backgroundColor: 'transparent'
          }}
          activeOpacity={1}
          onPress={this.animationFadeOut.bind(this)}
        />
      </View>
    );
  }
}

Pingo.propTypes = {
  setCurrentScene: PropTypes.func,
  setToken: PropTypes.func,
  setLocation: PropTypes.func
};
