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
  ]
};

const map = (state = initialState, action = {}) => {
  switch(action.type) {
  case types.onLocationChange:
    return update(state, {
      currentLocation: { $set: action.region }
    });
  case types.getMapMarkers:
    return state;
  case types.update_markers_A:
    if(state.category.indexOf('A') === -1) {
      state.category.push('A')
    }
    else {
      state.category.splice(state.category.indexOf('A'), 1)
    }
    state.markers = [];
    for(let i = 0; i < state.initial_markers.length; i+= 1) {
      if(state.category.indexOf(state.initial_markers[i].title) === -1) {
        state.markers.push(state.initial_markers[i]);
      }
    }
    return update(state, {
      markers: { $set: state.markers }
    });
  case types.update_markers_B:
    if(state.category.indexOf('B') === -1) {
      state.category.push('B')
    }
    else {
      state.category.splice(state.category.indexOf('B'), 1)
    }
    state.markers = [];
    for(let i = 0; i < state.initial_markers.length; i+= 1) {
      if(state.category.indexOf(state.initial_markers[i].title) === -1) {
        state.markers.push(state.initial_markers[i]);
      }
    }
    return update(state, {
      markers: { $set: state.markers }
    });
  case types.update_markers_C:
    if(state.category.indexOf('C') === -1) {
      state.category.push('C')
    }
    else {
      state.category.splice(state.category.indexOf('C'), 1)
    }
    state.markers = [];
    for(let i = 0; i < state.initial_markers.length; i+= 1) {
      if(state.category.indexOf(state.initial_markers[i].title) === -1) {
        state.markers.push(state.initial_markers[i]);
      }
    }
    return update(state, {
      markers: { $set: state.markers }
    });
  default:
    return state;
  }
};

export default map;
