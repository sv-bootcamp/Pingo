import {combineReducers} from 'redux';
import mapReducer from './map';
import listReducer from './list';
import fluxReducer from './flux';
import formReducer from './form';
import myPageReducer from './myPage';

export default combineReducers({
  map: mapReducer,
  list: listReducer,
  flux: fluxReducer,
  form: formReducer,
  myPage: myPageReducer
});
