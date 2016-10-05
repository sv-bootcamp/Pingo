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
              title={marker.title}
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
  markers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.object,
    lat: PropTypes.object,
    lng: PropTypes.object
  }))
};
