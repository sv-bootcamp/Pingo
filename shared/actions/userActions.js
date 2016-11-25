import * as types from './actionTypes';

export const setCreatedPosts = (createdPosts) => {
  return {
    type: types.setCreatedPosts,
    createdPosts: createdPosts
  };
};
