import EventList from '../components/eventList';
import { getAllItems, updateDone } from '../actions/listActions';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

const getCategorizedItems = (items, categoryFilter) => {
  switch (categoryFilter) {
  case 'SHOW_ALL':
    return items;
  case 'event':
    return items.filter(item => item.category === 'event');
  case 'facility':
    return items.filter(item => item.category === 'facility');
  case 'warning':
    return items.filter(item => item.category === 'warning');
  default:
    return items;
  }
};

const mapStateToProps = (state) => {
  return {
    dataSource: getCategorizedItems(state.list.dataSource, state.map.categoryFilter),
    currentLocation: state.map.currentLocation,
    zoomLevel: state.map.zoomLevel,
    needUpdate: state.list.needUpdate,
    currentPostedKey: state.list.currentPostedKey,
    currentPostedUri: state.list.currentPostedUri
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: (zoomLevel, lat, long) => {
      return dispatch(getAllItems(zoomLevel, lat, long));
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    updateDone: () => {
      return dispatch(updateDone());
    }
  };
};

const ListLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

export default ListLayout;
