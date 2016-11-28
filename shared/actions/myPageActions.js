import * as types from './actionTypes';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_SAVEDPOST, getAuthHeaders } from '../utils';

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
        headers: getAuthHeaders(accessToken)
      })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveSavedPosts(json))
      );
    });
  };
};
