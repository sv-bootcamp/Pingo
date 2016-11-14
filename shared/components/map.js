import React, {PropTypes, Component} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Platform} from 'react-native';
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
import {API_GEODATA, API_KEY} from '../utils';

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
  buttonSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16
  },
  fontRobotoMedium: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto-Medium'
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
    this.prevLat = null;
    this.prevLng = null;
    this.prevZoom = null;
    this.state = {
      markerSelect: ''
    };
  }

  componentWillMount() {
    this.setCurrentPosition();
    this.props.getZoomLevel(this.props.currentLocation.latitudeDelta);
    this.props.getMapItems(this.props.zoomLevel,
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude);
  }

  // todo: this is duplicate from Create.js. refactoring required
  getAddressData() {
    const uri = `${API_GEODATA}?latlng=${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}&key=${API_KEY}`;
    fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson !== undefined) {
        this.props.setCurrentCity(
          JSON.stringify(responseJson.results[0].address_components[3].long_name)
          .replace('"', '')
          .replace('"', '')
          .substring(0, 30)
        );
      }
    });
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      this.prevZoom = null;
      this.props.setLocation(newLocation);
    },
    (error) => {
      // todo: handle this error when gps is off
      console.log(error);
    });
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

  // todo: use centerOffset for IOS
  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style ={styles.map}
          onRegionChangeComplete={this.onLocationChange}
          region={this.props.currentLocation}
          onPress={this.onMapClick}
        >
          {this.props.items.map(item => (
            <MapView.Marker
              coordinate={{latitude: item.lat, longitude: item.lng}}
              anchor={(this.state.markerSelect === item.key) ? {x: 0.5, y: 0.7} : null}
              onPress={()=>{
                this.setMarkerClickTime();
                this.props.onMarkerClick(item);
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
        </MapView>
        <View style={styles.buttonSection}>
          <MapButton
            imageSource={'position'}
            handleOnPress={this.setCurrentPosition.bind(this)}/>
          <MapButton
            imageSource={'camera'}
            handleOnPress={this.handleCameraButton.bind(this)}/>
        </View>
        {
          (this.props.selectedItem.title === undefined) ? null :
            <CardLayout dataSource = {this.props.selectedItem} />
        }
      </View>
    );
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object,
  selectedItem: PropTypes.any,
  onLocationChange: PropTypes.func,
  getMapItems: PropTypes.func,
  setLocation: PropTypes.func,
  setCurrentCity: PropTypes.func,
  onMarkerClick: PropTypes.func,
  hideMapCard: PropTypes.func,
  setCurrentScene: PropTypes.func,
  getZoomLevel: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string),
  zoomLevel: PropTypes.any,
  detailSource: PropTypes.array
};
