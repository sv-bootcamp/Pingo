import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  dataSource: [],
  detailSource: [],
};

const list = (state = initialState, action) => {
  switch (action.type) {
  case types.getAllItems:
    return update(state, {
      dataSource: { $set: action.items }
    });
  case types.getDetailImage:
    console.log(JSON.stringify(action.items));
    return update(state, {
      detailSource: { $set: action.items }
    });
  default:
    return state;
  }
};

export default list;
