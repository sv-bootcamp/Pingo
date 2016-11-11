import React, {Component, PropTypes} from 'react';
import {Image, Platform, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import LoginFacebookLayout from '../containers/loginFacebookLayout';
import {
  getSecretToken,
  grantAnonymousUser,
  signupGuestUser,
  setLoginType
} from '../actions/authActions';

import ImgLogin1 from '../resources/initialScene/loginImage1.png';
import ImgLogin2 from '../resources/initialScene/loginImage2.png';
import ImgLogin3 from '../resources/initialScene/loginImage3.png';
import ImgLogo from '../resources/logo/pingo.png';

const WindowHeight = 477.8 + 162;
const WindowWidth = 360;
const BottomBoxHeight = 162;
const SwiperHeight = WindowHeight - BottomBoxHeight;
const LoginImgHeight = 550;
const LoginImgWidth = 250;

const styles = {
  wrapper: {
    flex: 1
  },
  slide0: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6a302',
    flexDirection: 'column'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c8cff'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff605e'
  },
  text: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    textAlign: 'center'
  },
  dot: {
    backgroundColor: 'white',
    opacity: 0.5,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
  bottomBox: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    elevation: 10
  },
  fontRobotoRegular: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Regular'
      }
    })
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      }
    })
  }
};

class InitialScene extends Component {
  constructor(props) {
    super(props);
  }
  renderSlide(style, upperText, belowText, image) {
    const swiperHeight = Dimensions.get('window').height * SwiperHeight / (WindowHeight);
    return (
      <View style={style}>
        <Text style={[styles.text, {top: Dimensions.get('window').height * 40 / WindowHeight}, styles.fontRobotoRegular]}>
          {upperText}{'\n'}{belowText}
        </Text>
        <Image
          style={[{
            position: 'absolute',
            top: swiperHeight * 124 / (WindowHeight),
            height: Dimensions.get('window').height * LoginImgHeight / (WindowHeight),
            width: Dimensions.get('window').width * LoginImgWidth / (WindowWidth),
            left: Dimensions.get('window').width * 55 / WindowWidth
          }]}
          source={image}
        />
      </View>
    );
  }
  renderLogo() {
    return (
      <View style={styles.slide0}>
        <Image
          source={ImgLogo}
        />
      </View>
    );
  }
  renderSwiper() {
    const swiperHeight = Dimensions.get('window').height * SwiperHeight / (WindowHeight);
    return (
      <Swiper
        style={styles.wrapper}
        dot={<View style={styles.dot}/>}
        activeDot={<View style={styles.activeDot}/>}
        height={swiperHeight}
      >
        {this.renderLogo()}
        {this.renderSlide(styles.slide1, 'Explore real-time information', 'happening near you', ImgLogin1)}
        {this.renderSlide(styles.slide2, 'Find event details and see how others', 'enjoy through their photos', ImgLogin2)}
        {this.renderSlide(styles.slide3, 'Share your photos in an event', 'with other travellers', ImgLogin3)}
      </Swiper>
    );
  }
  // todo: change borderRadius to relative
  renderBottomButton(text, btnStyle, txtStyle, wrapperStyle, handleButtonPress) {
    return (
      <View style={[{flex: 1, alignItems: 'center'}, wrapperStyle]}>
        <TouchableOpacity
          style={[{
            width: Dimensions.get('window').width * 280 / WindowWidth,
            height: Dimensions.get('window').height * 48 / WindowHeight,
            justifyContent: 'center',
            borderRadius: 10,
            elevation: 1
          }, btnStyle]}
          onPress={handleButtonPress}
        >
          <Text style={[{alignSelf: 'center', fontSize: 14}, txtStyle, styles.fontRobotoMedium]}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderBottomLoginButton() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', bottom: 10}}>
        <LoginFacebookLayout/>
      </View>
    );
  }
  handleGuestButton() {
    getSecretToken().then((data) => {
      if (data === null) {
        signupGuestUser();
      } else {
        grantAnonymousUser(data);
      }
    });
    setLoginType('guest');
    this.props.setToken('guest');
    this.props.setCurrentScene('map');
    Actions.map({type: 'replace'});
  }
  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{flex: 1}}>
          {this.renderSwiper()}
        </View>
        <View style={[styles.bottomBox, {height: Dimensions.get('window').height * BottomBoxHeight / (SwiperHeight + BottomBoxHeight)}]}>
          {this.renderBottomLoginButton()}
          {this.renderBottomButton(
            'Continue as guest',
            {backgroundColor: 'white'},
            {color: '#2b2b2b'},
            {top: 10},
            this.handleGuestButton.bind(this)
          )}
        </View>
      </View>
    );
  }
}

InitialScene.propTypes = {
  setCurrentScene: PropTypes.func,
  setToken: PropTypes.func
};

export default InitialScene;
