import React from 'react';
import { connect } from 'react-redux';

function select(state) {
  return {state};
}

const Modal = React.createClass({
  propTypes: {
    display: React.PropTypes.string.isRequired,
    onOverlayClick: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
  },

  render() {
    console.log(this.props);
    return (
      <div>
        <div className='overlay' onClick={this.props.onOverlayClick} style={{display: this.props.display}}></div>
        <div className='modal' style={{display: this.props.display}}>I'm the modal window!</div>
      </div>
    );
  },
});

export const ConnectedModal = connect(select)(Modal);
