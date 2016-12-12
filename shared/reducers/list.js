import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  dataSource: [],
  detailSource: [],
  needUpdate: false
};

const list = (state = initialState, action) => {
  switch (action.type) {
  case types.getAllItems:
    return update(state, {
      dataSource: { $set: action.items }
    });
  case types.getDetailImage:
    return update(state, {
      detailSource: { $set: action.items }
    });
  case types.needUpdate:
    return update(state, {
      needUpdate: { $set: true }
    });
  case types.updateDone:
    return update(state, {
      needUpdate: { $set: false}
    });
  default:
    return state;
  }
};

export default list;
