import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  pic: null
};

const form = (state = initialState, action) => {
  switch (action.type) {
  case types.setCurrentPic:
    return update(state, {
      pic: { $set: action.pic }
    });
  default:
    return state;
  }
};

export default form;
