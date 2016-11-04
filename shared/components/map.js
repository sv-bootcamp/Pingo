import React, {PropTypes, Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import CardLayout from '../containers/cardLayout';
import MapButton from './MapButton';
import eventPng from '../resources/marker/event_small.png';
import facilityPng from '../resources/marker/facility_small.png';
import warningPng from '../resources/marker/warning_small.png';

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
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.setMarkerClickTime = this.setMarkerClickTime.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
      this.props.setLocation(newLocation);
    });
  }

  handleCameraButton() {
    this.props.setCurrentScene('cameraView');
    Actions.cameraView();
  }

  onLocationChange(region) {
    this.props.getZoomLevel(this.props.currentLocation.latitudeDelta);
    this.props.getMapItems(this.props.zoomLevel,
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude);
    this.props.onLocationChange(region);
  }

  onMapClick() {
    const curTime = new Date();
    if (this.markerClickTime && curTime - this.markerClickTime > 100) {
      this.props.hideMapCard()
    }
  }

  setMarkerClickTime() {
    this.markerClickTime = new Date();
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style ={styles.map}
          onRegionChangeComplete={this.onLocationChange}
          region ={this.props.currentLocation}
          onPress={this.onMapClick}
        >
          {this.props.items.map(item => (
            <MapView.Marker
              coordinate={{latitude: item.lat, longitude: item.lng}}
              title={item.title}
              image={
                (item.category === 'event') ? eventPng :
                  (item.category === 'facility') ? facilityPng : warningPng
              }
              onPress={()=>{
                this.setMarkerClickTime();
                this.props.onMarkerClick(item);
              }}
            />
          ))}
        </MapView>

        <View
            style={styles.buttonSection}>
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
  onMarkerClick: PropTypes.func,
  hideMapCard: PropTypes.func,
  setCurrentScene: PropTypes.func,
  getZoomLevel: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string),
  zoomLevel: PropTypes.any
};
