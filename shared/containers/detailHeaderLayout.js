import DetailHeader from '../components/detailHeader';
import { setCurrentScene } from '../actions/fluxActions';
import { saveEvent, deleteEvent } from '../actions/myPageActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    saveEvent: (eventKey) => {
      return dispatch(saveEvent(eventKey));
    },
    deleteEvent: (eventKey) => {
      return dispatch(deleteEvent(eventKey));
    }
  };
};

const DetailHeaderLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailHeader);

export default DetailHeaderLayout;
