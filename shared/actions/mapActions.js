import * as types from './actionTypes';

const API_GET_MARKERS = 'http://goober.herokuapp.com/api/items';

export const onLocationChange = (region) => {
  return {
    type: types.onLocationChange,
    region: region
  };
};

export const receiveMarkers = (json) => {
  return {
    type: types.getMapMarkers,
    markers: json.items
  };
};

export const getMapMarkers = () => {
  return (dispatch) => {
    return fetch(API_GET_MARKERS)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveMarkers(json))
    );
  };
};

export const updateMarkers = (category) => {
  return {
    type: types.updateMarkers,
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
