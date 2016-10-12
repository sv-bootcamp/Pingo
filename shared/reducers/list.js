import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  dataSource: []
};

const list = (state = initialState, action) => {
  switch (action.type) {
  case types.getAllItems:
    return update(state, {
      dataSource: { $set: action.items }
    });
  default:
    return state;
  }
};

export default list;
