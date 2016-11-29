import * as types from './actionTypes';

export const setCreatedPosts = (createdPosts) => {
  return {
    type: types.setCreatedPosts,
    createdPosts: createdPosts
  };
};

export const setLoadingLoginAnimating = (loadingLoginAnimating) => {
  return {
    type: types.setLoadingLoginAnimating,
    loadingLoginAnimating: loadingLoginAnimating
  };
};
