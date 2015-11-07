import { createStore } from 'redux';
import { addressBookApp } from './reducers/reducers.js';
export const store = createStore(addressBookApp);
