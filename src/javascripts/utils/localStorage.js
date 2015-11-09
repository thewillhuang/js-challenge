// import {store} from '../store.js';
// import { setAddressBook } from '../actions/actions.js';

// export const storeToLocal = function() {
//   const state = store.getState().toJS();
//   localStorage.setItem('contacts', JSON.stringify(state));
// };
//
// export const getFromLocal = function() {
//   store.dispatch(setAddressBook(JSON.parse(localStorage.getItem('contacts'))));
// };

export const storeToLocal = store => next => action => {
  console.log('dispatching', action);
  const nextState = store.getState().toJS();
  localStorage.setItem('contacts', JSON.stringify(nextState));
  console.log('next state', store.getState());
  return next(action);
};

// export const storeToLocal = store => next => action => {
//   console.log('dispatching', action);
//   const nextState = store.getState().toJS();
//   localStorage.setItem('contacts', JSON.stringify(nextState));
//   console.log('next state', store.getState());
//   return next(action);
// };
