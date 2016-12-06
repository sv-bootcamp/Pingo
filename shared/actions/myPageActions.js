import * as types from './actionTypes';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_SAVEDPOST, getAuthHeaders, ENDPOINT_ITEM } from '../utils';
import { getCreatedPosts } from './userActions';

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
    getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'GET',
        headers
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
    getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
      const body = JSON.stringify({
        'entity': 'item',
        'itemKey': `${eventKey}`
      });
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'POST',
        headers,
        body
      })
      .then(response => response.json())
      .then(json => {
        if (json.message) {
          dispatch(getSavedPosts());
        }
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };
};

export const deleteEvent = (eventKey) => {
  return (dispatch) => {
    getAccessToken(dispatch).then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_SAVEDPOST}`;
      const headers = getAuthHeaders(accessToken);
      const body = JSON.stringify({
        'itemKey': `${eventKey}`
      });
      return fetch(address, {
        method: 'DELETE',
        headers,
        body
      })
      .then(response => response.json())
      .then(json => {
        if (json.message) {
          dispatch(getSavedPosts());
        }
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };
};

export const toggleModalVisible = () => {
  return {
    type: types.toggleModalVisible
  };
};

export const deleteMyphoto = (key) => {
  return (dispatch) => {
    getAccessToken(dispatch).then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_ITEM}/${key}`;
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'DELETE',
        headers
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getCreatedPosts());
        }
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };
};
