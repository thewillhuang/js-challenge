import React from 'react';

const Search = React.createClass({
  propTypes: {
    handleSearchQueryChange: React.PropTypes.func.isRequired,
    color: React.PropTypes.string.isRequired,
    searchMagColor: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      value: '',
    };
  },

  handleChange: function(event) {
    this.props.handleSearchQueryChange(event.target.value);
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

export default Search;
