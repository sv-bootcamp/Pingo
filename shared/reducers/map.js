import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  category: [],
  currentLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  initial_markers: [
    {title: 'A', description: 'up', latlng: {latitude: 37.7925, longitude: -122.4324}},
    {title: 'B', description: 'mid', latlng: {latitude: 37.7825, longitude: -122.4324}},
    {title: 'C', description: 'down', latlng: {latitude: 37.7725, longitude: -122.4324}}
  ],
  markers: [
    {title: 'A', description: 'up', latlng: {latitude: 37.7925, longitude: -122.4324}},
    {title: 'B', description: 'mid', latlng: {latitude: 37.7825, longitude: -122.4324}},
    {title: 'C', description: 'down', latlng: {latitude: 37.7725, longitude: -122.4324}}
  ],

  filter: (state) => {
    state.markers = [];
    for (let i = 0; i < state.initial_markers.length; i += 1) {
      if (state.category.indexOf(state.initial_markers[i].title) === -1) {
        state.markers.push(state.initial_markers[i]);
      }
    }
  }
};

const map = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.onLocationChange:
    return update(state, {
      currentLocation: { $set: action.region }
    });
  case types.getMapMarkers:
    return state;
  case types.update_markers:
    if (state.category.indexOf(action.select) === -1) {
      state.category.push(action.select);
    }
    else {
      state.category.splice(state.category.indexOf(action.select), 1);
    }
    state.filter(state);
    return update(state, {
      markers: { $set: state.markers }
    });
  case types.setLocation:
    return update(state, {
      currentLocation: { $set: action.location}
    });
  default:
    return state;
  }
};

export default map;
