import React from 'react';
import Search from './searchBox.jsx';
import AddButton from './addButton.jsx';
import {ContactsTable} from './table.jsx';
import {ConnectedModal} from './modal.jsx';

const procoreBlue = '#216FB5';
const procoreOrange = '#F58025';

const Body = React.createClass({
  handleAddButtonClick: function() {
    if (this.state.modalDisplay === 'none') {
      this.openModal();
    } else {
      this.closeModal();
    }
  },

  closeModal: function() {
    this.setState({
      modalDisplay: 'none',
      searchColor: procoreBlue,
      addButtonColor: procoreBlue,
      searchMagColor: 'white',
    });
  },

  openModal: function() {
    this.setState({
      modalDisplay: '',
      searchColor: 'white',
      addButtonColor: procoreOrange,
      searchMagColor: 'darkgrey',
    });
  },

  handleSearchQueryChange: function(query) {
    this.setState({
      searchQuery: query,
    });
  },

  getInitialState: function() {
    return {
      modalDisplay: 'none',
      searchQuery: '',
      searchColor: procoreBlue,
      addButtonColor: procoreBlue,
      searchMagColor: 'white',
    };
  },

  render() {
    // console.log(this.state);
    return (
      <div className='body'>
        <Search handleSearchQueryChange={this.handleSearchQueryChange} searchMagColor={this.state.searchMagColor} color={this.state.searchColor}/>
        <AddButton handleClick={this.handleAddButtonClick} color={this.state.addButtonColor}/>
        <ContactsTable query={this.state.searchQuery}/>
        <ConnectedModal display={this.state.modalDisplay} closeModal={this.closeModal} openModal={this.openModal}/>
      </div>
    );
  },
});

export default Body;
