import * as types from './actionTypes';

export const setCurrentPic = (pic) => {
  return {
    type: types.setCurrentPic,
    pic
  };
};
