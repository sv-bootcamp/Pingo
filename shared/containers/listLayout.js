import EventList from '../components/EventList';
import{ getAllItems } from '../actions/listActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dataSource: state.list.dataSource
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //actions: bindActionCreators(listActions, dispatch)
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
