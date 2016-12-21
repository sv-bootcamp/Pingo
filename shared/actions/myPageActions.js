import * as types from './actionTypes';
import { getCreatedPosts } from './userActions';
import UserRESTManager, {POST_ENTITY} from '../services/userService';
import ItemRESTManager from '../services/itemService';

export const setMyPageTabViewIndex = (myPageTabViewIndex) => {
  return {
    type: types.setMyPageTabViewIndex,
    myPageTabViewIndex: myPageTabViewIndex
  };
};

export const receiveSavedPosts = (json) => {
  return {
    type: types.getSavedPosts,
    savedPosts: json
  };
};

export const getSavedPosts = () => {
  return (dispatch) => {
    return UserRESTManager.getSavedPosts()
      .then(json => {
        dispatch(receiveSavedPosts(json));
      })
      .catch(console.log);
  };
};

// @TODO need to remove unnecessary flow.
export const saveEvent = (eventKey) => {
  return (dispatch) => {
    return UserRESTManager.addSavedPosts({
      entity: POST_ENTITY.ITEM,
      itemKey: eventKey
    })
    .then(() => {
        dispatch(getSavedPosts());
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const deleteEvent = (eventKey) => {
  return (dispatch) => {
    UserRESTManager.deleteSavedPost({
      itemKey: eventKey
    })
    .then(() => {
      dispatch(getSavedPosts());
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const toggleModalVisible = () => {
  return {
    type: types.toggleModalVisible
  };
};

export const deleteMyphoto = (key) => {
  return (dispatch) => {
    return ItemRESTManager.remove(key)
      .then(() => {
        dispatch(getCreatedPosts());
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
