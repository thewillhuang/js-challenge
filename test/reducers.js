'use strict';
import {expect} from 'chai';
import {fromJS} from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';
chai.use(chaiImmutable);
import {INITIAL_STATE, addressBookApp} from '../src/javascripts/reducers/reducers.js';
import {
  addContact,
  updateContact,
  deleteContact,
  filterBy,
  setAddressBook,
  sortAscBy,
  sortDecBy,
} from '../src/javascripts/actions/actions.js';


describe('reducers', () => {
  describe('addressBookApp\'s', () => {
    let state = INITIAL_STATE;
    it('addContact action should add a contact to the current state', () => {
      state = addressBookApp(state, addContact({test: 1}));
      expect(state).to.equal(fromJS([
        {test: 1},
      ]));
    });

    it('updateContact action should update a specified contact of the current state', () => {
      state = addressBookApp(state, updateContact(0, {test: 2}));
      expect(state).to.equal(fromJS([
        {test: 2},
      ]));
    });

    it('deleteContact action should delete a contact from the current state given an index', () => {
      state = addressBookApp(state, deleteContact(0));
      expect(state).to.equal(fromJS([]));
    });

    it('setAddressBook action should reset the state to be as the same as the payload', () => {
      state = addressBookApp(state, setAddressBook([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy'},
      ]));

      expect(state).to.equal(fromJS([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy'},
      ]));
    });

    it('filterBy action should filter the current state by name in addition to keeping the previous state', () => {
      state = addressBookApp(state, filterBy('william'));
      const expectedSignature = fromJS([
        {
          test: 1,
          day: 'sunny',
          fName: 'william',
          beforeFilter: [
            {test: 1, day: 'sunny', fName: 'william'},
            {test: 2, day: 'rainy'},
          ],
        },
      ]);
      expect(state).to.equal(expectedSignature);
    });

    it('filterBy action should use the previous state to return the new filter result', () => {
      state = addressBookApp(state, filterBy('william'));
      const expectedSignature = fromJS([
        {
          test: 1,
          day: 'sunny',
          fName: 'william',
          beforeFilter: [
            {test: 1, day: 'sunny', fName: 'william'},
            {test: 2, day: 'rainy'},
          ],
        },
      ]);
      expect(state).to.equal(expectedSignature);
    });

    it('sortAscBy action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, setAddressBook([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy', fName: 'leeroy'},
      ]));

      state = addressBookApp(state, sortAscBy('day'));
      expect(state).to.equal(fromJS([
        {test: 2, day: 'rainy', fName: 'leeroy'},
        {test: 1, day: 'sunny', fName: 'william'},
      ]));
    });

    it('sortDecBy action should cause reducer to return an updated state', () => {
      state = addressBookApp(state, sortDecBy('day'));
      expect(state).to.equal(fromJS([
        {test: 1, day: 'sunny', fName: 'william'},
        {test: 2, day: 'rainy', fName: 'leeroy'},
      ]));
    });
  });
});
