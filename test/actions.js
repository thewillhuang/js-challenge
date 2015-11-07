'use strict';
import {expect} from 'chai';
import {addContact, updateContact, deleteContact, filterBy, setAddressBook} from '../src/javascripts/actions/actions.js';

describe('actions', () => {
  it('should construct addContact action', () => {
    expect(addContact({test: 1})).to.eql({type: 'CREATE_CONTACT', contact: {test: 1}});
  });

  it('should construct updateContact action', () => {
    expect(updateContact(1, {test: 2})).to.eql({type: 'UPDATE_CONTACT', index: 1, contact: {test: 2}});
  });

  it('should construct deleteContact action', () => {
    expect(deleteContact(1)).to.eql({type: 'DELETE_CONTACT', index: 1});
  });

  it('should construct filterBy action', () => {
    expect(filterBy('william')).to.eql({type: 'FILTER', query: 'william'});
  });

  it('should constructsetAddressBook action', () => {
    expect(setAddressBook({test: 1, date: 2})).to.eql({type: 'SET_ADDRESSBOOK', payload: {test: 1, date: 2}});
  });
});
