import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  createdPosts: [],
  savedPosts: []
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setCreatedPosts:
    return update(state, {
      createdPosts: { $set: action.createdPosts }
    });
  default:
    return state;
  }
};

export default user;
