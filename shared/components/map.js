import React, {PropTypes, Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
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
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10
  },
  positionButton: {
  },
  cameraButton: {
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
    this.props.getMapItems();
    this.setCurrentPosition();
  }

  render() {
    return (
      <View style ={styles.container}>

        <MapView
          style ={styles.map}
          region ={this.props.currentLocation}
          onRegionChange ={this.props.onLocationChange}
        >
          <MapView.UrlTile
              urlTemplate={"http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"}
          />
        </MapView>

        <View
          style={styles.buttonSection}>
          <MapButton
            style={styles.positionButton}
            setCurrentPosition={this.setCurrentPosition.bind(this)}/>
          <MapButton
            style={styles.cameraButton}/>
        </View>

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
