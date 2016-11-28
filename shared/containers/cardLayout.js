import Card from '../components/Card';
import { getDetailImage } from '../actions/listActions';
import { setCurrentScene } from '../actions/fluxActions';
import { saveEvent, deleteEvent} from '../actions/myPageActions'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentScene: state.flux.currentScene
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailImage: (key) => {
      return dispatch(getDetailImage(key));
    },
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

const CardLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(Card);

export default CardLayout;
