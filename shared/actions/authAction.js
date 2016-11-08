import * as types from './actionTypes';

export const getToken = (token) => {
  return {
    type: types.getToken,
    token
  };
};
