import React, {PropTypes, Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import Card from './Card';
import MapButton from './MapButton';

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
    this._onLocationChange = this._onLocationChange.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
  }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        this.props.setLocation(newLocation);
      }
    );
  }

  handleCameraButton() {
    this.props.setCurrentScene('cameraView');
    Actions.cameraView();
  }

  componentWillMount() {
    this.setCurrentPosition();
    this.props.getZoomLevel(this.props.currentLocation.latitudeDelta);
    this.props.getMapItems(this.props.zoomLevel,
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude);
  }

  _onLocationChange(region) {
    this.props.getZoomLevel(this.props.currentLocation.latitudeDelta);
    this.props.getMapItems(this.props.zoomLevel,
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude);
    this.props.onLocationChange(region);
  }

  onMapClick(obj) {
    if (obj === undefined) {
      this.props.hideMapCard();
    }
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style ={styles.map}
          region ={this.props.currentLocation}
          onRegionChangeComplete={this._onLocationChange}
          onPress={(obj) => this.onMapClick(obj.bubbles)}
        >
          {this.props.items.map(item => (
            <MapView.Marker
              coordinate={{latitude: item.lat, longitude: item.lng}}
              title={item.title}
              image={
                (item.category === 'event') ? require('../resources/marker/event_small.png') :
                    (item.category === 'facility') ? require('../resources/marker/facility_small.png') :
                        require('../resources/marker/warning_small.png')
              }
              onPress={()=>{
                this.props.onMarkerClick(item);
              }}
              onSelect={()=>{
                this.props.onMarkerClick(item);
              }}/>
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
              <Card
                  dataSource = {this.props.selectedItem}
              />
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
