import React from 'react';
import { connect } from 'react-redux';
import { filterBy, setAddressBook } from '../actions/actions.js';

const Search = React.createClass({
  propTypes: {
    color: React.PropTypes.string.isRequired,
    searchMagColor: React.PropTypes.string.isRequired,
    state: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      valueLength: 0,
    };
  },

  handleChange: function(event) {
    const query = event.target.value;
    this.setState({
      valueLength: query.length,
    });
    if (query.length >= this.state.valueLength) {
      this.props.dispatch(filterBy(event.target.value));
    } else {
      this.props.dispatch(setAddressBook(JSON.parse(localStorage.getItem('contacts'))));
      this.props.dispatch(filterBy(event.target.value));
    }
  },

  render() {
    return (
      <div className='search'>
        <div className='search-bar'>
          <input type='search' placeholder='Search' className='searchInput' onChange={this.handleChange}/>
          <button type='submit' className='buttonSize' style={{
            backgroundColor: this.props.color,
            border: this.props.color,
          }}>
            <i className='fa fa-search searchButton fa-flip-horizontal' style={{color: this.props.searchMagColor}}></i>
          </button>
        </div>
      </div>
    );
  },
});

function select(state) {
  return {state};
}

export const ConnectedSearch = connect(select)(Search);
