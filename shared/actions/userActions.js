import * as types from './actionTypes';
import UserRESTManager from '../services/userService';

export const setCreatedPosts = (createdPosts) => {
  return {
    type: types.setCreatedPosts,
    createdPosts: createdPosts
  };
};

export const getCreatedPosts = () => {
  return (dispatch) => {
    UserRESTManager.getCreatedPosts()
      .then(json => dispatch(setCreatedPosts(json)))
      .catch(console.log);
  };
};

export const setLoadingLoginAnimating = (loadingLoginAnimating) => {
  return {
    type: types.setLoadingLoginAnimating,
    loadingLoginAnimating: loadingLoginAnimating
  };
};
