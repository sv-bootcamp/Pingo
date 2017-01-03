import * as types from './actionTypes';
import ItemRESTManager from '../services/itemService';

export const setCurrentPic = (pic) => {
  return {
    type: types.setCurrentPic,
    pic
  };
};

export const requestAddItem = (body) => {
  return ItemRESTManager.add(body);
};