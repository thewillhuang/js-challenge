import { createStore } from 'redux';
import todoApp from './reducers/reducers.js';
export const store = createStore(todoApp);
