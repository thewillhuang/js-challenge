'use strict';
import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';
chai.use(chaiImmutable);


describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    const addContact = (currentState, newContact) => {
      return currentState.push(newContact);
    };

    it('is immutable', () => {
      const state = List.of(Map({one: 1}));
      const nextState = addContact(state, Map({two: 2}));

      expect(nextState).to.equal(fromJS([
        {one: 1},
        {two: 2},
      ]));
      expect(state).to.equal(fromJS([
        {one: 1},
      ]));
    });
  });
});
