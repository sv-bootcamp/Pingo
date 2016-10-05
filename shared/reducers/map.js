import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  currentLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
};

const map = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.onLocationChange:
    return update(state, {
      currentLocation: { $set: action.region }
    })
  default:
    return state;
  }
}

export default map;
