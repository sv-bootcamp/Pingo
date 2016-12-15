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
    console.log('hhh');
    console.log(action.items);
    let newDataSource = action.items;
    console.log(newDataSource);
    let index = newDataSource.findIndex((event)=>{
      return (event.key === state.currentPostedKey)
    });
    console.log(index);
    newDataSource[index].imageUrls[0] = state.currentPostedUri;
    return update(state, {
      dataSource: { $set: newDataSource },
      currentPostedUri: { $set: ''},
      currentPostedKey: { $set: ''}
    })
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
