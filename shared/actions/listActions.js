import * as types from './actionTypes';
// import {SERVER_ADDR, ENDPOINT_IMAGE, HTTP,
//   queryBuilder, createQueryObject} from '../utils'; We will use later
import ItemRESTManager from '../services/itemService';

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
// TODO: remove console statement
export const getAllItems = (zoomLevel, lat, long) => {
  return (dispatch) => {
    return ItemRESTManager.getByArea(zoomLevel, lat, long)
      .then(json => dispatch(receiveItems(json)))
      .catch(console.log);
  };
};

export const receiveImages = (json) => {
  return {
    type: types.getDetailImage,
    items: json.values
  };
};

export const receiveUpdate = (json) => {
  return {
    type: types.needUpdate,
    items: json.items
  };
};


export const needUpdate = (zoomLevel, lat, long) => {
  return (dispatch) => {
    ItemRESTManager.getByArea(zoomLevel, lat, long)
      .then(json => dispatch(receiveUpdate(json)))
      .catch(console.log); // eslint-disable-line no-console
  };
};

export const setPostedKey = (itemKey) => {
  return {
    type: types.setPostedKey,
    itemKey
  };
};

export const setPostedUri = (uri) => {
  return {
    type: types.setPostedUri,
    uri
  };
};

export const getDetailImage = (key) => {
  return (dispatch) => {
    return ItemRESTManager.get(key)
      .then(json => {
        dispatch(receiveImages(json));
        return json.values;
      })
      .catch(console.log);
  };
};
