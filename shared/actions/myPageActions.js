import * as types from './actionTypes';
import { getAccessToken } from './authActions';

export const setMyPageTabViewIndex = (myPageTabViewIndex) => {
  return {
    type: types.setMyPageTabViewIndex,
    myPageTabViewIndex: myPageTabViewIndex
  };
};

export const receiveSavedPosts = (json) => {
  return {
    type: types.getSavedPosts,
    savedPosts: json
  };
};

export const getSavedPosts = () => {
  return (dispatch) => {
    const address = 'https://goober.herokuapp.com/api/users/savedposts';
    getAccessToken().then((accessToken) => {
      console.log(accessToken);
      return fetch(address, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': `bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveSavedPosts(json))
      );
    });
  }
};
