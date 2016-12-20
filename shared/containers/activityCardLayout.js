import ActivityCard from '../components/activityCard';
import { getDetailImage } from '../actions/listActions';
import { setCurrentScene } from '../actions/fluxActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailImage: (key) => {
      return dispatch(getDetailImage(key));
    },
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const ActivityCardLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivityCard);

export default ActivityCardLayout;
