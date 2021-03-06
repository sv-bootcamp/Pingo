import DetailView from '../components/detailView';
import { getAllItems } from '../actions/listActions';
import { setCurrentScene } from '../actions/listActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    detailSource: state.list.detailSource
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

const DetailViewLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailView);

export default DetailViewLayout;
