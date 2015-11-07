import {List, fromJS} from 'immutable';
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER,
  SET_ADDRESSBOOK,
  SORT_ASC,
  SORT_DEC,
} from '../actions/actions.js';
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
    const filtered = state.filter((map) => {
      return (map.get('fName') === action.query);
    });

    return filtered.map(v => {
      return v.set('beforeFilter', state);
    });

  case SET_ADDRESSBOOK:
    return fromJS(action.payload);

  case SORT_ASC:
    return state.sort((a, b) => {
      let value = 0;
      if (a.get(action.key) > b.get(action.key)) {
        value = 1;
      } else {
        value = -1;
      }
      return value;
    });

  case SORT_DEC:
    const key = action.key;
    return state.sort((a, b) => {
      let value = 0;
      if (a.get(key) > b.get(key)) {
        value = -1;
      } else {
        value = 1;
      }
      return value;
    });

  default:
    return state;
  }
}
