import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import AllLayout from './AllLayout';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AllLayout/>
      </Provider>
    );
  }
}
