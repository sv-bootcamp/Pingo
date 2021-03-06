import MyPage from '../components/myPage';
import { connect } from 'react-redux';
import { setCurrentScene } from '../actions/fluxActions';
import { setMyPageTabViewIndex, getSavedPosts, toggleModalVisible } from '../actions/myPageActions';
import {
  setToken,
  setUserName,
  setUserEmail,
  setProfileImgUrl
} from '../actions/authActions';
import { getCreatedPosts } from '../actions/userActions';

// todo: change items later
const mapStateToProps = (state) => {
  return {
    myPageTabViewIndex: state.myPage.myPageTabViewIndex,
    myPageTabViewRoutes: state.myPage.myPageTabViewRoutes,
    items: state.map.items,
    token: state.auth.token,
    userName: state.auth.userName,
    profileImgUrl: state.auth.profileImgUrl,
    savedPosts: state.myPage.savedPosts,
    createdPosts: state.user.createdPosts,
    loadingLoginAnimating: state.user.loadingLoginAnimating,
    modalVisible: state.myPage.modalVisible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentScene: (currentScene) => {
      return dispatch(setCurrentScene(currentScene));
    },
    setMyPageTabViewIndex: (myPageTabViewIndex) => {
      return dispatch(setMyPageTabViewIndex(myPageTabViewIndex));
    },
    setToken: (token) => {
      return dispatch(setToken(token));
    },
    setUserName: (userName) => {
      return dispatch(setUserName(userName));
    },
    setUserEmail: (userEmail) => {
      return dispatch(setUserEmail(userEmail));
    },
    setProfileImgUrl: (profileImgUrl) => {
      return dispatch(setProfileImgUrl(profileImgUrl));
    },
    getSavedPosts: () => {
      return dispatch(getSavedPosts());
    },
    getCreatedPosts: () => {
      return dispatch(getCreatedPosts());
    },
    toggleModalVisible: () => {
      return dispatch(toggleModalVisible());
    }
  };
};

const MyPageLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);

export default MyPageLayout;
