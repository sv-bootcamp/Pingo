import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  token: ''
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setToken:
    return update(state, {
      token: { $set: action.token }
    });
  default:
    return state;
  }
};

export default auth;
