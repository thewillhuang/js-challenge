import { createStore } from 'redux';
import { reducer } from './reducers/reducers.js';
export const store = createStore(reducer);
