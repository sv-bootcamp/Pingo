import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  token: '',
  userName: '',
  userEmail: '',
  profileImgUrl: ''
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.setToken:
    return update(state, {
      token: { $set: action.token }
    });
  case types.setUserName: {
    return update(state, {
      userName: { $set: action.userName }
    });
  }
  case types.setUserEmail: {
    return update(state, {
      userEmail: { $set: action.userEmail }
    });
  }
  case types.setProfileImgUrl: {
    return update(state, {
      profileImgUrl: { $set: action.profileImgUrl }
    });
  }
  default:
    return state;
  }
};

export default auth;
