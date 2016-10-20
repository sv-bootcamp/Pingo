import * as types from './actionTypes';

const API_GET_ITEMS = 'http://goober.herokuapp.com/api/items';

export function TBD() {
  return {
    type: types.TBD
  };
}

export const receiveItems = (json) => {
  return {
    type: types.getAllItems,
    items: json.items
  };
};

export const getAllItems = () => {
  return (dispatch) => {
    return fetch(API_GET_ITEMS)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveItems(json))
    );
  };
};
