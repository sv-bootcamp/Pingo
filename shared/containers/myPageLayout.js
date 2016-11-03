import MyPage from '../components/myPage';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setMyPageTabViewIndex } from '../actions/myPageActions';

// todo: change items later
const mapStateToProps = (state) => {
  return {
    myPageTabViewIndex: state.myPage.myPageTabViewIndex,
    myPageTabViewRoutes: state.myPage.myPageTabViewRoutes,
    items: state.map.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setMyPageTabViewIndex: (myPageTabViewIndex) => {
      return dispatch(setMyPageTabViewIndex(myPageTabViewIndex));
    }
  };
};

const MyPageLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);

export default MyPageLayout;
