import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  tabviewIndex: 0,
  tabviewRoutes: [
    {key: '1', title: 'All'},
    {key: '2', title: 'Events'},
    {key: '3', title: 'Facilities'},
    {key: '4', title: 'Warning'}
  ],
  currentLocation: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  },
  userLocation: {
    latitude: 0,
    longitude: 0
  },
  zoomLevel: 14,
  items: [],
  selectedItem: {},
  categoryFilter: 'SHOW_ALL',
  currentCity: '',
  currentPostedKey: '',
  currentPostedUri: ''
};

const map = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.onLocationChange:
    return update(state, {
      currentLocation: { $set: action.region }
    });
  case types.getMapItems:
    return update(state, {
      items: { $set: action.items }
    });
  case types.categorizeItems:
    return update(state, {
      categoryFilter: { $set: action.category }
    });
  case types.setLocation:
    return update(state, {
      currentLocation: { $set: action.location }
    });
  case types.setUserLocation:
    return update(state, {
      userLocation: {$set: action.userLocation }
    });
  case types.setTabViewIndex:
    return update(state, {
      tabviewIndex: { $set: action.index }
    });
  case types.setCurrentCity:
    return update(state, {
      currentCity: { $set: action.city }
    });
  case types.onMarkerClick:
    return update(state, {
      selectedItem: { $set: action.item }
    });
  case types.getZoomLevel:
    return update(state, {
      zoomLevel: { $set: action.zoomLevel }
    });
  case types.hideMapCard:
    return update(state, {
      selectedItem: { $set: {} }
    });
  case types.toggleSaved:
    return update(state, {
      selectedItem: {isSaved: {$set: action.bool}}
    });
  case types.showListCard:
    return state;
  case types.setPostedKey:
    return update(state, {
      currentPostedKey: { $set: action.itemKey }
    });
  case types.setPostedUri:
    return update(state, {
      currentPostedUri: { $set: action.uri }
    });
  case types.needUpdate:
    const newDataSource = action.items;
    const index = newDataSource.findIndex(event => event.key === state.currentPostedKey);
    newDataSource[index].imageUrls[0] = state.currentPostedUri;
    return update(state, {
      items: { $set: newDataSource },
      currentPostedUri: { $set: ''},
      currentPostedKey: { $set: ''}
    });
  default:
    return state;
  }
};

export default map;
