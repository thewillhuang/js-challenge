import React from 'react';
import { connect } from 'react-redux';
import {addContact} from '../actions/actions.js';

function select(state) {
  return {state};
}

const Modal = React.createClass({
  propTypes: {
    display: React.PropTypes.string.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    openModal: React.PropTypes.func.isRequired,
    state: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  },

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  clearState: function() {
    this.setState({
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      notes: '',
    });
  },

  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      notes: '',
    };
  },

  getFirstName: function(event) {
    this.setState({
      firstName: event.target.value,
    });
  },
  getLastName: function(event) {
    this.setState({
      lastName: event.target.value,
    });
  },
  getDob: function(event) {
    this.setState({
      dob: event.target.value,
    });
  },
  getPhone: function(event) {
    this.setState({
      phone: event.target.value,
    });
  },
  getEmail: function(event) {
    this.setState({
      email: event.target.value,
    });
  },
  getNotes: function(event) {
    this.setState({
      notes: event.target.value,
    });
  },

  handleSubmit: function() {
    if (this.state.firstName.length) {
      this.props.dispatch(addContact(this.state));
    } else {
      this.props.openModal();
    }
    this.clearState();
    this.props.closeModal();
  },

  handleKeyDown: function(event) {
    switch (event.keyCode) {
    case 27:
      this.props.closeModal();
      break;
    case 13:
      this.handleSubmit();
      break;
    default:
      break;
    }
  },

  render() {
    return (
      <div>
        <div className='overlay' onClick={this.props.closeModal} style={{display: this.props.display}}></div>
        <div className='modal' style={{display: this.props.display}}>
          <div className='modalHeader'>
            <label className='headerLabel modelLabel'>Contacts Keeper</label>
            <i className='fa fa-times-circle modelXButton fa-lg' onClick={this.props.closeModal}></i>
          </div>
          <div className='modalBody'>
            <div className='labels'>First Name</div>
            <div className='labels'>Last Name</div>
            <div className='input'>
              <input onChange={this.getFirstName} value={this.state.firstName} ref={ref => {this.firstName = ref; }}/>
            </div>
            <div className='input'>
              <input onChange={this.getLastName} value={this.state.lastName} />
            </div>

            <div className='labels'>Date of Birth</div>
            <div className='labels'>Phone Number</div>
            <div className='input'>
              <input onChange={this.getDob} value={this.state.dob}/>
            </div>
            <div className='input'>
              <input onChange={this.getPhone} value={this.state.phone}/>
            </div>

            <div className='labels'>Email</div>
            <div className='labels'>Notes</div>
            <div className='input'>
              <input onChange={this.getEmail} value={this.state.email}/>
            </div>
            <div className='input'>
              <input onChange={this.getNotes} value={this.state.notes}/>
            </div>
          </div>
          <div className='modalFooter'>
            <hr/>
            <div className='modalSave' onClick={this.handleSubmit}><p>Save</p></div>
          </div>
        </div>
      </div>
    );
  },
});

export const ConnectedModal = connect(select)(Modal);
