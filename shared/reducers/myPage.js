import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  myPageTabViewIndex: 0,
  myPageTabViewRoutes: [
    {key: '1', title: 'Activity'},
    {key: '2', title: 'Favorite'}
  ],
  savedPosts: []
};

const myPage = (state = initialState, action) => {
  switch (action.type) {
  case types.setMyPageTabViewIndex:
    return update(state, {
      myPageTabViewIndex: { $set: action.myPageTabViewIndex }
    });
  case types.getSavedPosts:
    return update(state, {
      savedPosts: { $set: action.savedPosts }
    });
  default:
    return state;
  }
};

export default myPage;
