import * as types from './actionTypes';
import {
  queryBuilder, createQueryObject} from '../utils';
import { getAccessToken } from './authActions';
import { HTTPS, SERVER_ADDR, ENDPOINT_ITEM, getAuthHeaders } from '../utils';
import { setLoadingLoginAnimating } from './userActions';

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
    const queries = [];
    queries.push(createQueryObject('lat', lat));
    queries.push(createQueryObject('lng', long));
    queries.push(createQueryObject('zoom', zoomLevel));
    queries.push(createQueryObject('isThumbnail', true));
    return getAccessToken().then((accessToken) => {
      const address = `${HTTPS}${SERVER_ADDR}${ENDPOINT_ITEM}/${queryBuilder(queries)}`;
      const headers = getAuthHeaders(accessToken);
      return fetch(address, {
        method: 'GET',
        headers
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setLoadingLoginAnimating(false));
        dispatch(receiveItems(json));
        return;
      })
      .catch((error) => console.log(error));
    });
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

export const setUserLocation = (userLocation) => {
  return {
    type: types.setUserLocation,
    userLocation
  };
};

export const setTabViewIndex = (index) => {
  return {
    type: types.setTabViewIndex,
    index
  };
};

export const setCurrentCity = (city) => {
  return {
    type: types.setCurrentCity,
    city
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
