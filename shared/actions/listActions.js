import * as types from './actionTypes';
// import {SERVER_ADDR, ENDPOINT_IMAGE, HTTP,
//   queryBuilder, createQueryObject} from '../utils'; We will use later
import {queryBuilder, createQueryObject} from '../utils';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_ITEM, ENDPOINT_IMAGE, getAuthHeaders} from '../utils';

export function TBD() {
  return {
    type: types.TBD
  };
}

export const receiveItems = (json) => {
  return {
    type: types.getAllItems,
    items: json.items
  };
};

// todo: refactor getting item function in mapActions
export const getAllItems = (zoomLevel, lat, long) => {
  return (dispatch) => {
    const queries = [];
    queries.push(createQueryObject('isThumbnail', true));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', long));

    // todo recover this when aws is ready: const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_ITEM}${queryBuilder(queries)}`;
    // const address = `https://goober.herokuapp.com/api/items/${queryBuilder(queries)}`;
    getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_ITEM}/${queryBuilder(queries)}`;
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'GET',
        headers
      })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveItems(json))
      )
      .catch((error) => {
        console.log(error);
      });
    });
  };
};

export const receiveImages = (json) => {
  return {
    type: types.getDetailImage,
    items: json.values
  };
};

export const getDetailImage = (key) => {
  return (dispatch) => {
    const queries = [];
    queries.push(createQueryObject('item', key));
    // const address = `${HTTP}${'SERVER_ADDR'}${ENDPOINT_IMAGE}${queryBuilder(queries)}`;
    // const address = `https://goober.herokuapp.com/api/images/${queryBuilder(queries)}`;
    return getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_IMAGE}/${queryBuilder(queries)}`;
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'GET',
        headers
      })
      .then(response => response.json())
      .then(json => {
        return new Promise((resolve) => {
          dispatch(receiveImages(json));
          resolve(json.values);
        });
      });
    });
  };
};
