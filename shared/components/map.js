import React, {PropTypes, Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import Card from './Card';

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
    this.props.getMapItems();
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
          region ={this.props.currentLocation}
          onRegionChange ={this.props.onLocationChange}
        >
          {this.props.items.map(item => (
            <MapView.Marker
              coordinate={{latitude: item.lat, longitude: item.lng}}
              title={item.title}
              onSelect={()=>{this.props.onMarkerClick(item)}}/>
          ))}
          <MapView.UrlTile
              urlTemplate={"http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"}
          />
        </MapView>
        <Card
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
  items: PropTypes.arrayOf(PropTypes.shape({
    coordinate: PropTypes.object,
    description: PropTypes.string
  })),
  category: PropTypes.arrayOf(PropTypes.string)
};
