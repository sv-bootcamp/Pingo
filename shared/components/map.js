import React, {PropTypes, Component} from 'react';
import {Animated, Easing, StyleSheet, View, Text, Image, Dimensions, Platform} from 'react-native';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import CardLayout from '../containers/cardLayout';
import MapButton from './MapButton';
import eventPng from '../resources/marker/event_small.png';
import facilityPng from '../resources/marker/facility_small.png';
import warningPng from '../resources/marker/warning_small.png';
import eventClickPng from '../resources/marker/event_big.png';
import facilityClickPng from '../resources/marker/facility_big.png';
import warningClickPng from '../resources/marker/warning_big.png';
import userPng from '../resources/marker/user.png';
import userSmallPng from '../resources/marker/user_small.png';
import {API_GEODATA, API_KEY} from '../utils';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  buttonLocationSection: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    height: 48,
    width: 48
  },
  buttonCameraSection: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    height: 48,
    width: 48
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
      },
      ios: {
        fontWeight: 'bold'
      }
    })
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.setMarkerClickTime = this.setMarkerClickTime.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.getAddressData = this.getAddressData.bind(this);
    this.cardAnimationSlideUp = this.cardAnimationSlideUp.bind(this);
    this.buttonAnimationSlideUp = this.buttonAnimationSlideUp.bind(this);
    this.checkMarkerClicked = this.checkMarkerClicked.bind(this);
    this.renderUserIndicatorMarker = this.renderUserIndicatorMarker.bind(this);
    this.prevLat = null;
    this.prevLng = null;
    this.prevZoom = null;
    this.state = {
      markerSelect: '',
      cardTranslateY: new Animated.Value(0),
      buttonTranslateY: new Animated.Value(0),
      userLocationEnabled: false
    };
    this.watchID = null;
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h2>Use Location ?</h2>' +
        'This app wants to change your device settings:<br/><br/>' +
        'Use GPS, Wi-Fi, and cell network for location<br/><br/>',
        ok: 'YES',
        cancel: 'NO'
      })
      .then((success) => {
        console.log(success);
        this.setCurrentPosition();
        this.props.getZoomLevel(this.props.currentLocation.latitudeDelta);
        this.props.getMapItems(this.props.zoomLevel,
          this.props.currentLocation.latitude,
          this.props.currentLocation.longitude);
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  }

  cardAnimationSlideUp() {
    this.state.cardTranslateY.setValue(0);
    Animated.timing(
      this.state.cardTranslateY,
      {
        toValue: 1,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }

  buttonAnimationSlideUp() {
    this.state.buttonTranslateY.setValue(0);
    Animated.timing(
      this.state.buttonTranslateY,
      {
        toValue: 1,
        duration: 250,
        easing: Easing.quad
      }
    ).start();
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.props.setUserLocation(userLocation);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // todo: this is duplicate from Create.js. refactoring required
  getAddressData() {
    const DEFAULT_CURRENT_CITY = 'PINGO';
    const uri = `${API_GEODATA}?latlng=${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}&key=${API_KEY}`;
    fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {
      return JSON.stringify(responseJson.results[0].address_components[3].long_name)
              .replace('"', '')
              .replace('"', '')
              .substring(0, 30);
    })
    .catch(() => {
      return DEFAULT_CURRENT_CITY;
    })
    .then(cityName => {
      return this.props.setCurrentCity(cityName);
    });
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.004724,
        longitudeDelta: 0.004023
      };
      this.prevZoom = null;
      this.props.setLocation(newLocation);
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.props.setUserLocation(userLocation);
      this.setState({userLocationEnabled: true});
    },
    (error) => {
      // todo: handle this error when gps is off
      console.log(error);
      this.setState({userLocationEnabled: false});
    });
  }

  handleLocationButton() {
    this.setCurrentPosition();
    // todo: change to appropriate zoom level when it is clicked
  }

  handleCameraButton() {
    this.props.setCurrentScene('cameraView');
    Actions.cameraView({lastScene: 'map'});
  }

  updatePrevValues() {
    this.prevLat = this.props.currentLocation.latitude;
    this.prevLng = this.props.currentLocation.longitude;
    this.prevZoom = Math.round(this.props.zoomLevel * 100) / 100;
  }

  onLocationChange(region) {
    this.getAddressData();
    const needToFetch = () => {
      if (!this.prevZoom || this.prevZoom !== Math.round(this.props.zoomLevel * 100) / 100) {
        return true;
      }
      if (Math.abs(this.prevLat - this.props.currentLocation.latitude) >
        this.props.currentLocation.latitudeDelta) {
        return true;
      } else if (Math.abs(this.prevLng - this.props.currentLocation.longitude) >
        this.props.currentLocation.longitudeDelta) {
        return true;
      }
      return false;
    };

    this.props.setLocation(region);
    this.props.getZoomLevel(region.latitudeDelta);
    if (!needToFetch()) {
      return;
    }
    this.props.getMapItems(this.props.zoomLevel,
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude);
    this.updatePrevValues();
    this.props.onLocationChange(region);
  }

  onMapClick() {
    const curTime = new Date();
    if (this.markerClickTime && curTime - this.markerClickTime > 100) {
      this.props.hideMapCard();
    }
    if (this.state.markerSelect !== '') {
      this.setState({markerSelect: ''});
    }
  }

  setMarkerClickTime() {
    this.markerClickTime = new Date();
  }

  renderMarkerSelectImage(category) {
    if (category === 'event') {
      return eventClickPng;
    } else if (category === 'facility') {
      return facilityClickPng;
    } else if (category === 'warning') {
      return warningClickPng;
    }
    return null;
  }

  renderMarkerImage(key, select, category) {
    if (key === select) {
      return this.renderMarkerSelectImage(category);
    }
    if (category === 'event') {
      return eventPng;
    } else if (category === 'facility') {
      return facilityPng;
    } else if (category === 'warning') {
      return warningPng;
    }
    return null;
  }

  renderUserIndicatorMarker() {
    if (this.props.zoomLevel <= 18 && this.props.zoomLevel > 17) {
      return userPng;
    }
    return userSmallPng;
  }

  checkMarkerClicked() {
    return (this.props.selectedItem && this.props.selectedItem.title === undefined);
  }

  // todo: use centerOffset for IOS
  render() {
    const cardTranslateY = this.state.cardTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [199, 0]
    });
    const buttonTranslateY = this.state.buttonTranslateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 199 + 16]
    });
    return (
      <View style ={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style ={styles.map}
          onRegionChangeComplete={this.onLocationChange}
          region={this.props.currentLocation}
          onPress={this.onMapClick}
        >
          {(!this.props.items) ? null : this.props.items.map(item => (
            <MapView.Marker
              key={item.key}
              style={{zIndex: (this.state.markerSelect === item.key) ? 10 : 0}}
              coordinate={{latitude: item.lat, longitude: item.lng}}
              anchor={(Platform.OS === 'android' && this.state.markerSelect === item.key) ? {x: 0.5, y: 0.8} : null}
              centerOffset={(Platform.OS === 'ios' && this.state.markerSelect === item.key) ? {x: 0, y: -10} : null}
              onPress={()=>{
                this.setMarkerClickTime();
                this.props.onMarkerClick(item);
                this.cardAnimationSlideUp();
                this.buttonAnimationSlideUp();
                this.setState({markerSelect: item.key});
              }}
            >
              <Image
                style={{
                  height: (this.state.markerSelect === item.key) ? Dimensions.get('window').height * 103 / 640
                    : Dimensions.get('window').width * 28 / 360,
                  width: (this.state.markerSelect === item.key) ? Dimensions.get('window').width * 88.6 / 360
                    : Dimensions.get('window').width * 28 / 360
                }}
                source={this.renderMarkerImage(item.key, this.state.markerSelect, item.category)}
              >
                {(this.state.markerSelect === item.key) ?
                  <Text style={[{
                    alignSelf: 'center',
                    top: Dimensions.get('window').height * 23 / 640,
                    fontSize: 14,
                    color: '#ffffff'
                  }, styles.fontRobotoMedium]}>
                    {(this.props.selectedItem) ? this.props.selectedItem.imageUrls.length : null}
                  </Text>
                  : null}
              </Image>
            </MapView.Marker>
          ))}
          {(this.state.userLocationEnabled === true) ?
            <MapView.Marker
              coordinate={{latitude: this.props.userLocation.latitude, longitude: this.props.userLocation.longitude}}
              image={this.renderUserIndicatorMarker()}
              anchor={{x: 0.5, y: 0.5}}
            />
          : null}
        </MapView>
        {
          (this.checkMarkerClicked()) ?
          <View style={styles.buttonLocationSection}>
            <MapButton
              imageSource={'position'}
              handleOnPress={this.handleLocationButton.bind(this)}/>
          </View>
          :
          <Animated.View style={[styles.buttonLocationSection, {bottom: buttonTranslateY}]}>
            <MapButton
              imageSource={'position'}
              handleOnPress={this.handleLocationButton.bind(this)}/>
          </Animated.View>
        }
        {
          (this.checkMarkerClicked()) ?
          <View style={styles.buttonCameraSection}>
            <MapButton
              imageSource={'camera'}
              handleOnPress={this.handleCameraButton.bind(this)}/>
          </View>
          :
          <Animated.View style={[styles.buttonCameraSection, {bottom: buttonTranslateY}]}>
            <MapButton
              imageSource={'camera'}
              handleOnPress={this.handleCameraButton.bind(this)}/>
          </Animated.View>
        }
        {
          (this.checkMarkerClicked()) ? null :
            <Animated.View style={{transform: [{translateY: cardTranslateY}]}}>
              <CardLayout
                dataSource = {this.props.selectedItem}
                style={{
                  ...Platform.select({
                    ios: {
                      shadowOpacity: 0.15,
                      shadowRadius: 2
                    }
                  })
                }}
              />
            </Animated.View>
        }
      </View>
    );
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object,
  userLocation: PropTypes.object,
  selectedItem: PropTypes.any,
  onLocationChange: PropTypes.func,
  getMapItems: PropTypes.func,
  setLocation: PropTypes.func,
  setUserLocation: PropTypes.func,
  setCurrentCity: PropTypes.func,
  onMarkerClick: PropTypes.func,
  hideMapCard: PropTypes.func,
  setCurrentScene: PropTypes.func,
  getZoomLevel: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string,
    key: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string),
  zoomLevel: PropTypes.any,
  detailSource: PropTypes.array
};
