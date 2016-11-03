import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  dataSource: [],
  detailSource: [],
  detailIndex: 0
};

const list = (state = initialState, action) => {
  switch (action.type) {
  case types.getAllItems:
    return update(state, {
      dataSource: { $set: action.items }
    });
  case types.getDetailImage:
    console.log(action.index);
    return update(state, {
      detailSource: { $set: action.items },
      detailIndex: { $set: action.index }
    });
  default:
    return state;
  }
};

export default list;
