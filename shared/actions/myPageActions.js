import * as types from './actionTypes';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_SAVEDPOST } from '../utils';

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
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
    getAccessToken().then((accessToken) => {
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
  };
};
