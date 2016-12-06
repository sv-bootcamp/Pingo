import * as types from './actionTypes';
import { HTTPS, SERVER_ADDR, ENDPOINT_CREATEDPOST } from '../utils';
import { getAccessToken } from '../actions/authActions';

export const setCreatedPosts = (createdPosts) => {
  return {
    type: types.setCreatedPosts,
    createdPosts: createdPosts
  };
};

export const getCreatedPosts = () => {
  return (dispatch) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_CREATEDPOST}`;
    getAccessToken().then((accessToken) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`
      };
      fetch(address, {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setCreatedPosts(json));
      })
      .catch((error) => console.log(error));
    });
  };
};

export const setLoadingLoginAnimating = (loadingLoginAnimating) => {
  return {
    type: types.setLoadingLoginAnimating,
    loadingLoginAnimating: loadingLoginAnimating
  };
};
