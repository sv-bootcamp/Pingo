import {combineReducers} from 'redux';
import mapReducer from './map';
import listReducer from './list';
import fluxReducer from './flux';

export default combineReducers({
  map: mapReducer,
  list: listReducer,
  flux: fluxReducer
});
