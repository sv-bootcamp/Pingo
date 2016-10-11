import {combineReducers} from 'redux';
import mapReducer from './map';
import navigatorReducer from './navigator';
export default combineReducers({
  map: mapReducer,
  navigator: navigatorReducer
});
