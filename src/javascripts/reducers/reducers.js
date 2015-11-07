import {List, fromJS} from 'immutable';
import {CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, FILTER, SET_ADDRESSBOOK} from '../actions/actions.js';
export const INITIAL_STATE = new List();

export function addressBookApp(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_CONTACT:
    return state.push(fromJS(action.contact));

  case UPDATE_CONTACT:
    return state.update(action.index, () => {return fromJS(action.contact); });

  case DELETE_CONTACT:
    return state.delete(action.index);

  case FILTER:
    return state.filter((x) => {
      // console.log('what is x', x.get('fName'));
      return (x.get('fName') === action.query);
    });

  case SET_ADDRESSBOOK:
    return fromJS(action.payload);

  default:
    return state;
  }
}
