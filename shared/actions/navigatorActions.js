import * as types from './actionTypes';

export const setRoute = (route) => {
  return {
    type: types.setRoute,
    route
  };
};

export const setNavigator = (navigator) => {
  return {
    type: types.setNavigator,
    navigator
  };
};
export const onForward = (index, navigator) => {
  return {
    type: types.onForward,
    index: index,
    navigator: navigator
  };
};

export const setSceneIndex = (sceneIndex) => {
  return {
    type: types.setSceneIndex,
    sceneIndex
  };
};

export const setMyPageNavigator = (navigator) => {
  return {
    type: types.setMyPageNavigator,
    navigator
  };
};

export const setMyPageSceneIndex = (index) => {
  return {
    type: types.setMyPageSceneIndex,
    index
  };
};
