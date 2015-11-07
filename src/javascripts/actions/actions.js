// action types
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const FILTER = 'FILTER';
export const SET_ADDRESSBOOK = 'SET_ADDRESSBOOK';

// action creators
export function addContact(contact) {
  return {
    type: CREATE_CONTACT,
    contact: contact,
  };
}

export function updateContact(index, contact) {
  return {
    type: UPDATE_CONTACT,
    contact: contact,
    index: index,
  };
}

export function deleteContact(index) {
  return {
    type: DELETE_CONTACT,
    index: index,
  };
}

export function filterBy(query) {
  return {
    type: FILTER,
    query: query,
  };
}

export function setAddressBook(payload) {
  return {
    type: SET_ADDRESSBOOK,
    payload: payload,
  };
}
