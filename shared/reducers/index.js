import {combineReducers} from 'redux';
import mapReducer from './map';
import listReducer from './list';
import navigatorReducer from './navigator';
export default combineReducers({
  map: mapReducer,
  navigator: navigatorReducer,
  list: listReducer
});
