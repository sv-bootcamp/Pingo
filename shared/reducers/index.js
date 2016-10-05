import {combineReducers} from 'redux';
import mapReducer from './map';

export default combineReducers({
  map: mapReducer
});
