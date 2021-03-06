import {expect} from 'chai';
import {fromJS} from 'immutable';
import chaiImmutable from 'chai-immutable';
import chai from 'chai';
chai.use(chaiImmutable);
import {INITIAL_STATE, reducer} from '../src/javascripts/reducers/reducers.js';
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
  let state = INITIAL_STATE;
  it('addContact action should add a contact to the current state', () => {
    state = reducer(state, addContact({test: 1}));
    expect(state).to.equal(fromJS([
      {test: 1},
    ]));
  });

  it('updateContact action should update a specified contact of the current state', () => {
    state = reducer(state, updateContact(0, {test: 2}));
    expect(state).to.equal(fromJS([
      {test: 2},
    ]));
  });

  it('deleteContact action should delete a contact from the current state given an index', () => {
    state = reducer(state, deleteContact(0));
    expect(state).to.equal(fromJS([]));
  });

  it('setAddressBook action should reset the state to be as the same as the payload', () => {
    state = reducer(state, setAddressBook([
      {test: 1, day: 'sunny', firstName: 'william'},
      {test: 2, day: 'rainy'},
    ]));

    expect(state).to.equal(fromJS([
      {test: 1, day: 'sunny', firstName: 'william'},
      {test: 2, day: 'rainy'},
    ]));
  });

  it('filterBy action should filter the current state by name', () => {
    state = reducer(state, filterBy('william'));
    const expectedSignature = fromJS([
      {
        test: 1,
        day: 'sunny',
        firstName: 'william',
      },
    ]);
    expect(state).to.equal(expectedSignature);
  });

  // it('filterBy action should use the previous state to return the new filter result', () => {
  //   state = reducer(state, filterBy('william'));
  //   const expectedSignature = fromJS([
  //     {
  //       test: 1,
  //       day: 'sunny',
  //       firstName: 'william',
  //     },
  //   ]);
  //   expect(state).to.equal(expectedSignature);
  // });

  it('sortAscBy action should cause reducer to return an updated state', () => {
    state = reducer(state, setAddressBook([
      {test: 1, day: 'sunny', firstName: 'william'},
      {test: 2, day: 'rainy', firstName: 'leeroy'},
    ]));

    state = reducer(state, sortAscBy('day'));
    expect(state).to.equal(fromJS([
      {test: 2, day: 'rainy', firstName: 'leeroy'},
      {test: 1, day: 'sunny', firstName: 'william'},
    ]));
  });

  it('sortDecBy action should cause reducer to return an updated state', () => {
    state = reducer(state, sortDecBy('day'));
    expect(state).to.equal(fromJS([
      {test: 1, day: 'sunny', firstName: 'william'},
      {test: 2, day: 'rainy', firstName: 'leeroy'},
    ]));
  });
});
