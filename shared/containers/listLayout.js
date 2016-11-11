import EventList from '../components/EventList';
import { getAllItems } from '../actions/listActions';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

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
    dataSource: getCategorizedItems(state.list.dataSource, state.map.categoryFilter),
    currentLocation: state.map.currentLocation,
    zoomLevel: state.map.zoomLevel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: (zoomLevel, lat, long) => {
      return dispatch(getAllItems(zoomLevel, lat, long));
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const ListLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

export default ListLayout;
