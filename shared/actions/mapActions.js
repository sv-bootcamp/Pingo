import * as types from './actionTypes';
import {
  queryBuilder, createQueryObject} from '../utils';
import { getAccessToken } from './authActions';

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
    // todo: recover this when aws is ready: const address = `${HTTP}${SERVER_ADDR}${ENDPOINT_ITEM}${queryBuilder(queries)}`;
    const address = `https://goober.herokuapp.com/api/items${queryBuilder(queries)}`;
    getAccessToken().then((accessToken) => {
      console.log(address);
      console.log(accessToken);
      const headers = {
        authorization: `bearer ${accessToken}`
      };
      return fetch(address, {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(json =>
        dispatch(receiveItems(json))
      )
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
