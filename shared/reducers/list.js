import * as types from '../actions/actionTypes';
import update from 'react-addons-update';
import { ListView } from 'react-native';

const initialState = {
  dataSource: new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  }).cloneWithRows([])
};

const list = (state = initialState, action) => {
  switch (action.type) {
  case types.getAllItems:
    return update(state, {
      dataSource: { $set: state.dataSource.cloneWithRows(action.items) }
    });
  default:
    return state;
  }
};

export default list;
