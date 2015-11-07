import React from 'react';
import { render } from 'react-dom';
import { store } from './store.js';
import { Provider } from 'react-redux';
import { Root } from './components/app.jsx';
const rootElement = document.getElementById('root');

render((
  <Provider store={store}>
    <Root/>
  </Provider>
), rootElement);
