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
    return update(state, {
      needUpdate: { $set: true }
    });
  case types.updateDone:
    let newState = state;
    if (state.currentPostedKey === '') {
      newState.dataSource[0].imageUrls[0] = state.currentPostedUri;
    }
    else {
      let index = state.dataSource.findIndex((event)=>{
        return (event.key === state.currentPostedKey)
      });
      newState.dataSource[index].imageUrls[0] = state.currentPostedUri;
    }
    newState.needUpdate = false;
    newState.currentPostedUri = '';
    newState.currentPostedKey = '';
    return newState;
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
