import * as types from './actionTypes';

export const setCurrentScene = (currentScene) => {
    return {
        type: types.setCurrentScene,
        currentScene
    };
};
