import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    currentScene: 'map'
};

const flux = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setCurrentScene:
    return update(state, {
      currentScene: { $set: action.currentScene }
    });
  default:
    return state;
  }
};

export default flux;
