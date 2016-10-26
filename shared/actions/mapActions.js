import * as types from './actionTypes';

const API_GET_ITEMS = 'http://goober.herokuapp.com/api/items?isThumbnail=true&lat=';

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

export const getMapItems = (zoomLevel, lat, long) => {
  return (dispatch) => {
    return fetch(API_GET_ITEMS + lat.toString() + '&lng=' + long.toString() + '&zoom=' + zoomLevel.toString())
      .then(response => response.json())
      .then(json =>
        dispatch(receiveItems(json))
    );
  };
};

export const onMarkerClick = (item) => {
  return {
    type: types.onMarkerClick,
    item: item
  };
};

export const hideMapCard = () => {
  return {
    type: types.hideMapCard
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

export const getZoomLevel = (latitudeDelta) => {
  let zoomLevel = Math.log2(750 / latitudeDelta);
  if (latitudeDelta > 50) {
    zoomLevel = 0;
  } else if (zoomLevel > 21) {
    zoomLevel = 21;
  } else if (zoomLevel < 0) {
    zoomLevel = 0;
  }
  return {
    type: types.getZoomLevel,
    zoomLevel
  };
};

export const showListCard = () => {
  return {
    type: types.showListCard
  };
};
