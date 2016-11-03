import * as types from './actionTypes';
import {SERVER_ADDR, ENDPOINT_ITEM, ENDPOINT_IMAGE, HTTP,
  queryBuilder, createQueryObject} from '../utils';

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

export const getAllItems = (zoomLevel, lat, long) => {
  return (dispatch) => {
    const queries = [];
    queries.push(createQueryObject('isThumbnail', true));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', long));

    const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_ITEM}${queryBuilder(queries)}`;
    return fetch(address)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveItems(json))
    );
  };
};

export const receiveImages = (json, index) => {
  return {
    type: types.getDetailImage,
    items: json.values,
    index: index
  };
};

export const getDetailImage = (key, index) => {
  return (dispatch) => {
    const queries = [];
    queries.push(createQueryObject('item', key));

    const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_IMAGE}${queryBuilder(queries)}`;
    return fetch(address)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveImages(json, index))
    );
  };
};
