/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { currency } from './Currency';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(currency);

render(<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'));

serviceWorker.unregister();
