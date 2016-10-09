import React, {PropTypes, Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMapMarkers();
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

  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style ={styles.map}
          initialRegion ={this.props.currentLocation}
          onRegionChange ={this.props.onLocationChange}
        >
          {this.props.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object,
  onLocationChange: PropTypes.func,
  getMapMarkers: PropTypes.func,
  setLocation: PropTypes.func,
  markers: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string)
};
