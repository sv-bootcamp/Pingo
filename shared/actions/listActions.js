import * as types from './actionTypes';

const API_GET_ITEMS = 'http://ec2-52-78-96-168.ap-northeast-2.compute.amazonaws.com/api/items?isThumbnail=true&lat=';
const API_GET_IMAGES = 'http://ec2-52-78-96-168.ap-northeast-2.compute.amazonaws.com/api/images?item=';

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
    return fetch(API_GET_ITEMS + lat.toString() + '&lng=' + long.toString() + '&zoom=' + zoomLevel.toString())
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
    index
  };
};

export const getDetailImage = (key, index) => {
  return (dispatch) => {
    return fetch(API_GET_IMAGES + key)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveImages(json, index))
    );
  };
};
