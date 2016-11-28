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
      )
      .catch((error) => {
        console.log(error);
      });
    });
  };
};

export const saveEvent = (eventKey) => {
  return (dispatch) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
    const bodySave = JSON.stringify({
      'entity': 'item',
      'itemKey': `${eventKey}`
    });
    getAccessToken().then((accessToken) => {
      return fetch(address, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': `bearer ${accessToken}`
        },
        body: bodySave
      })
      .then(response => response.json())
      .then(json => {
        if(json.message){
          dispatch(getSavedPosts());
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  };
};

export const deleteEvent = (eventKey) => {
  return (dispatch) => {
    const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
    const bodySave = JSON.stringify({
      'itemKey': `${eventKey}`
    });
    getAccessToken(dispatch).then((accessToken) => {
      return fetch(address, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': `bearer ${accessToken}`
        },
        body: bodySave
      })
      .then(response => response.json())
      .then(json => {
        if(json.message){
          dispatch(getSavedPosts());
        }
      })
      .catch((error) => {
        console.log(error);
      })
    });
  };
};
