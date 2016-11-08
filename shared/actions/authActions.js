import * as types from './actionTypes';
import { AsyncStorage } from 'react-native';

const STORAGE_KEY = '@PingoStorage:key';

export const setToken = (token) => {
  return {
    type: types.setToken,
    token
  }
};

export const getUserToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const setUserToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, token);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log(error.message);
  }
};
