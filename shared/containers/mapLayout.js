import Map from '../components/map';
import { onLocationChange, getMapItems, setLocation, onMarkerClick, hideMapCard, getZoomLevel } from '../actions/mapActions';
import { setCurrentScene } from '../actions/fluxActions';
import { connect } from 'react-redux';

const getCategorizedItems = (items, categoryFilter) => {
  switch (categoryFilter) {
  case 'SHOW_ALL':
    return items;
  case 'EVENTS':
    return items.filter(item => item.category === 'event');
  case 'FACILITIES':
    return items.filter(item => item.category === 'facility');
  case 'WARNING':
    return items.filter(item => item.category === 'warning');
  default:
    return items;
  }
};

const mapStateToProps = (state) => {
  return {
    items: getCategorizedItems(state.map.items, state.map.categoryFilter),
    selectedItem: state.map.selectedItem,
    currentLocation: state.map.currentLocation,
    setCurrentScene: state.flux.setCurrentScene,
    cardVisible: state.map.cardVisible
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
    getZoomLevel: () => {
      return dispatch(getZoomLevel());
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
