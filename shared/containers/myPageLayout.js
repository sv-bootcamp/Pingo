import MyPage from '../components/myPage';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';

const mapStateToProps = () => {
  return {
    // TBD
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    }
  };
};

const MyPageLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPage);

export default MyPageLayout;
