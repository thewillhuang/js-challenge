import React from 'react';
const AddButton = React.createClass({
  propTypes: {
    handleClick: React.PropTypes.func.isRequired,
    color: React.PropTypes.string.isRequired,
  },

  render() {
    console.log(this.props);
    return (
      <div className='addButton' onClick={this.props.handleClick}>
          <button type='submit' className='addButtonSize' style={{backgroundColor: this.props.color, border: this.props.color}}>
          <i className='fa fa-plus-circle plusIcon'/>
          <span className='addButtonLabel'>Contacts Keeper</span>
          </button>
      </div>
    );
  },
});

export default AddButton;
