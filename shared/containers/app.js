import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import MapLayout from './mapLayout';
// import ListLayout from './listLayout';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MapLayout />
      </Provider>
    );
  }
}
