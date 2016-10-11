import * as types from './actionTypes';

const API_GET_ITEMS = 'http://goober.herokuapp.com/api/items';

export const onLocationChange = (region) => {
  return {
    type: types.onLocationChange,
    region: region
  };
};

export const receiveItems = (json) => {
  return {
    type: types.getMapItems,
    items: json.items
  };
};

export const getMapItems = () => {
  return (dispatch) => {
    return fetch(API_GET_ITEMS)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveItems(json))
    );
  };
};

export const categorizeItems = (category) => {
  return {
    type: types.categorizeItems,
    category: category
  };
};

export const setLocation = (location) => {
  return {
    type: types.setLocation,
    location
  };
};

export const setTabViewIndex = (index) => {
  return {
    type: types.setTabViewIndex,
    index
  };
};
