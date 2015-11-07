'use strict';
import {expect} from 'chai';
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  FILTER,
  SET_ADDRESSBOOK,
  SORT_ASC,
  SORT_DEC,
  addContact,
  updateContact,
  deleteContact,
  filterBy,
  sortAscBy,
  sortDecBy,
  setAddressBook} from '../src/javascripts/actions/actions.js';

describe('actions', () => {
  it('should construct addContact action', () => {
    expect(addContact({test: 1})).to.eql({
      type: CREATE_CONTACT,
      contact: {test: 1}},
    );
  });

  it('should construct updateContact action', () => {
    expect(updateContact(1, {test: 2})).to.eql({
      type: UPDATE_CONTACT,
      index: 1,
      contact: {test: 2},
    });
  });

  it('should construct deleteContact action', () => {
    expect(deleteContact(1)).to.eql({
      type: DELETE_CONTACT,
      index: 1,
    });
  });

  it('should construct filterBy action', () => {
    expect(filterBy('william')).to.eql({
      type: FILTER,
      query: 'william',
    });
  });

  it('should construct setAddressBook action', () => {
    expect(setAddressBook({
      test: 1,
      date: 2,
    })).to.eql({
      type: SET_ADDRESSBOOK,
      payload: {test: 1, date: 2},
    });
  });

  it('should construct sortAscBy action', () => {
    expect(sortAscBy('test')).to.eql({
      type: SORT_ASC,
      key: 'test'});
  });

  it('should construct sortDecBy action', () => {
    expect(sortDecBy('test2')).to.eql({
      type: SORT_DEC,
      key: 'test2'});
  });
});
