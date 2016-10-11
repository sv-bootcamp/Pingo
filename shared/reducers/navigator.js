import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  navigator: '',
  route: '',
  sceneIndex: 0
};

const navigator = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setNavigator:
    return update(state, {
      navigator: { $set: action.navigator }
    });
  case types.setRoute:
    return update(state, {
      route: { $set: action.route }
    });
  case types.onForward:
    if (action.index > 0) {
      action.navigator.pop();
    }
    else {
      action.navigator.push({
        index: 1
      });
    }
    return state;
  case types.setSceneIndex:
    return update(state, {
      sceneIndex: { $set: action.sceneIndex }
    });
  default:
    return state;
  }
};

export default navigator;
