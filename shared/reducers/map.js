import * as types from '../actions/actionTypes';

const initialState = {
    //TBD
};

export default function map(state = initialState, action = {}) {
    switch (action.type) {
        case types.TBD:
            return {
                ...state
            };
        default:
            return state;
    }
}
