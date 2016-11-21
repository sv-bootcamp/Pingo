import * as types from './actionTypes';
import {ENDPOINT_IMAGE, HTTP,
  queryBuilder, createQueryObject} from '../utils'; // Now, we use temporary query, so We don't need SERVER_ADDR
// import {SERVER_ADDR, ENDPOINT_IMAGE, HTTP,
//   queryBuilder, createQueryObject} from '../utils';
import { getAccessToken } from './authActions';

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
    const address = `https://goober.herokuapp.com/api/items/${queryBuilder(queries)}`;
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
        dispatch(receiveItems(json))
      );
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
    //const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_IMAGE}${queryBuilder(queries)}`;
    const address = `${HTTP}${"goober.herokuapp.com"}${ENDPOINT_IMAGE}${queryBuilder(queries)}`;
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
        dispatch(receiveImages(json))
      );
    });
  };
};
