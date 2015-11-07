'use strict';
import {expect} from 'chai';
import {fromJS} from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';
chai.use(chaiImmutable);
import {INITIAL_STATE, addressBookApp} from '../src/javascripts/reducers/reducers.js';
import {addContact, updateContact, deleteContact, filterBy, setAddressBook} from '../src/javascripts/actions/actions.js';


describe('reducers', () => {
  describe('addressBookApp\'s', () => {
    let state = INITIAL_STATE;
    it('addContact action should cause reducer to return an updated state ', () => {
      state = addressBookApp(state, addContact({test: 1}));
      expect(state).to.equal(fromJS([
        {test: 1},
      ]));
    });

    it('updateContact action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, updateContact(0, {test: 2}));
      expect(state).to.equal(fromJS([
        {test: 2},
      ]));
    });

    it('deleteContact action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, deleteContact(0));
      expect(state).to.equal(fromJS([]));
    });

    it('setAddressBook action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, setAddressBook([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy'},
      ]));

      expect(state).to.equal(fromJS([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy'},
      ]));
    });

    it('filterBy action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, filterBy('william'));
      expect(state).to.equal(fromJS([
        {test: 1, day: 'sunny', fName: 'william'},
      ]));
    });
  });
});
