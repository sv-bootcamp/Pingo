import EventList from '../components/EventList';
import { getAllItems } from '../actions/listActions';
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
    dataSource: getCategorizedItems(state.list.dataSource, state.map.categoryFilter),
    cardVisible: state.map.cardVisible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => {
      return dispatch(getAllItems());
    }
  };
};

const ListLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventList);

export default ListLayout;
