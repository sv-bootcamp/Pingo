import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  dataSource: [],
  detailSource: [],
  needUpdate: false,
  currentPostedKey: '',
  currentPostedUri: ''
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
    const newDataSource = action.items;
    const index = newDataSource.findIndex(event => event.key === state.currentPostedKey);
    newDataSource[index].imageUrls[0] = state.currentPostedUri;
    return update(state, {
      dataSource: { $set: newDataSource },
      currentPostedUri: { $set: ''},
      currentPostedKey: { $set: ''}
    });
  case types.setPostedKey:
    return update(state, {
      currentPostedKey: { $set: action.itemKey }
    });
  case types.setPostedUri:
    return update(state, {
      currentPostedUri: { $set: action.uri }
    });
  default:
    return state;
  }
};

export default list;
