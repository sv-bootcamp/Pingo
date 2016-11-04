import DetailHeader from '../components/detailHeader';
import { setCurrentScene } from '../actions/fluxActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const DetailHeaderLayout = connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailHeader);

export default DetailHeaderLayout;
