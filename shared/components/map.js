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
    this._getCurrentZoomLevel = this._getCurrentZoomLevel.bind(this);
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

  _getCurrentZoomLevel() {
    let zoomLevel = Math.log2(750 / this.props.currentLocation.latitudeDelta);
    if (this.props.currentLocation.latitudeDelta > 50) {
      zoomLevel = 0;
    }
    else if (zoomLevel > 21) {
      zoomLevel = 21;
    }
    else if (zoomLevel < 0) {
      zoomLevel = 0;
    }
    return zoomLevel;
  }

  handleCameraButton() {
    this.props.setCurrentScene('cameraView');
    Actions.cameraView();
  }

  componentWillMount() {
    this.setCurrentPosition();
    this.props.getMapItems(this._getCurrentZoomLevel(),
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude);
  }

  _onLocationChange(region) {
    this.props.getMapItems(this._getCurrentZoomLevel(),
      this.props.currentLocation.latitude,
      this.props.currentLocation.longitude);
    this.props.onLocationChange(region);
  }

  onMapClick(obj) {
    console.log(obj);
  }

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style ={styles.map}
          region ={this.props.currentLocation}
          onRegionChange ={this._onLocationChange}
          onPress={(obj) => this.onMapClick(obj.bubbles)}
        >
          {this.props.items.map(item => (
              <MapView.Marker
                  coordinate={{latitude: item.lat, longitude: item.lng}}
                  title={item.title}
                  onPress={()=>{this.props.onMarkerClick(item)}}
                  onSelect={()=>{this.props.onMarkerClick(item)}}/>
          ))}

          <MapView.UrlTile
              urlTemplate={"http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"}
          />
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

        <Card
          cardVisible={this.props.cardVisible}
          title={this.props.selectedItem.title}
          address={this.props.selectedItem.address}
        />
      </View>
    );
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object,
  onLocationChange: PropTypes.func,
  getMapItems: PropTypes.func,
  setLocation: PropTypes.func,
  selectedItem: PropTypes.any,
  onMarkerClick: PropTypes.func,
  cardVisible: PropTypes.bool,
  hideMapCard: PropTypes.func,
  setCurrentScene: PropTypes.func,
  getZoomLevel: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string)
};
