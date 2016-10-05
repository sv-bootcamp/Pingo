import React, {Component} from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import store from '../store';

import * as reducers from '../reducers';
import MapLayout from './mapLayout';
//import ListLayout from './listLayout';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MapLayout />
      </Provider>
    );
  }
}
