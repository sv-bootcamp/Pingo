import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  myPageTabViewIndex: 0,
  myPageTabViewRoutes: [
    {key: '1', title: 'Activity'},
    {key: '2', title: 'Favorite'}
  ]
};

const myPage = (state = initialState, action) => {
  switch (action.type) {
  case types.setMyPageTabViewIndex:
    return update(state, {
      myPageTabViewIndex: { $set: action.myPageTabViewIndex }
    });
  default:
    return state;
  }
};

export default myPage;
