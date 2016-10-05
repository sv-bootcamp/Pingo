import * as types from '../actions/actionTypes';

const initialState = {
  currentLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
};

export default function map(state = initialState, action = {}) {
  switch (action.type) {
  case types.TBD:
    return {
      ...state
    };
  case types.onLocationChange:
  	console.log('I am in broooo');
    return {
    	...state
    };
  default:
    return state;
  }
}
