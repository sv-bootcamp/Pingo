import Map from '../components/map';
import { onLocationChange, getMapItems, setLocation, onMarkerClick, hideMapCard, getZoomLevel } from '../actions/mapActions';
import { setCurrentScene } from '../actions/fluxActions';
import { setCurrentCity, setUserLocation } from '../actions/mapActions';
import { setLoadingLoginAnimating } from '../actions/userActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    items: state.map.items,
    selectedItem: state.map.selectedItem,
    currentLocation: state.map.currentLocation,
    detailSource: state.map.detailSource,
    setCurrentScene: state.flux.setCurrentScene,
    userLocation: state.map.userLocation,
    zoomLevel: state.map.zoomLevel,
    categoryFilter: state.map.categoryFilter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationChange: (region) => {
      return dispatch(onLocationChange(region));
    },
    getMapItems: (zoomLevel, lat, long) => {
      return dispatch(getMapItems(zoomLevel, lat, long));
    },
    setLocation: (location) => {
      return dispatch(setLocation(location));
    },
    onMarkerClick: (item) => {
      return dispatch(onMarkerClick(item));
    },
    hideMapCard: () => {
      return dispatch(hideMapCard());
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    getZoomLevel: (latitudeDelta) => {
      return dispatch(getZoomLevel(latitudeDelta));
    },
    setCurrentCity: (city) => {
      return dispatch(setCurrentCity(city));
    },
    setUserLocation: (userLocation) => {
      return dispatch(setUserLocation(userLocation));
    },
    setLoadingLoginAnimating: (loadingLoginAnimating) => {
      return dispatch(setLoadingLoginAnimating(loadingLoginAnimating));
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
