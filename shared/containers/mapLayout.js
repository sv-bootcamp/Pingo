import Map from '../components/map';
import { onLocationChange, getMapItems, setLocation, onMarkerClick } from '../actions/mapActions';
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
    currentLocation: state.map.currentLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLocationChange: (region) => {
      return dispatch(onLocationChange(region));
    },
    getMapItems: () => {
      return dispatch(getMapItems());
    },
    setLocation: (location) => {
      return dispatch(setLocation(location));
    },
    onMarkerClick: (item) => {
      return dispatch(onMarkerClick(item));
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
