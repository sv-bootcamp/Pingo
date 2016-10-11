import Map from '../components/map';
import { onLocationChange, getMapItems, setLocation } from '../actions/mapActions';
import { connect } from 'react-redux';

const getCategorizedItems = (items, categoryFilter) => {
  switch (categoryFilter) {
  case 'SHOW_ALL':
    return items;
  case 'A':
    return items.filter(item => item.category === 'event');
  case 'B':
    return items.filter(item => item.category === 'facility');
  case 'C':
    return items.filter(item => item.category === 'warning');
  default:
    return items;
  }
};

const mapStateToProps = (state) => {
  return {
    items: getCategorizedItems(state.map.items, state.map.categoryFilter),
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
    }
  };
};

const MapLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapLayout;
