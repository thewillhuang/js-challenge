import React from 'react';
import {Table, Column} from 'fixed-data-table';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  sortAscBy,
  sortDecBy,
  setAddressBook,
} from '../actions/actions.js';
import io from 'socket.io-client';

const socket = io.connect();
const local = JSON.parse(localStorage.getItem('contacts'));

function returnHeight(offset = -300) {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + offset;
}

function returnWidth(offset = -100) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + offset;
  return width;
}

const DisplayTable = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    window.onresize = this.resize;
    if (local) {
      this.props.dispatch(setAddressBook(JSON.parse(localStorage.getItem('contacts'))));
    }
    const ctx = this;
    socket.on('updated', function(data) {
      ctx.props.dispatch(setAddressBook(data.contacts));
    });
  },

  getInitialState: function() {
    return {
      w: returnWidth(),
      h: returnHeight(),
      sortBy: 0,
      sortDir: 1,
    };
  },

  headerRender: function(label, cellDataKey) {
    // console.log(label);
    return (
      <div className='tableHeader' onClick={this.sortBy.bind(null, cellDataKey)}>{label}</div>
    );
  },

  resize: function() {
    this.setState({
      w: returnWidth(),
      h: returnHeight(),
    });
  },

  sortBy: function(key) {
    // console.log(key);

    if (this.state.sortDir === 0) {
      this.setState({
        sortDir: 1,
        sortBy: key,
      });
      this.props.dispatch(sortAscBy(key));
    } else {
      this.setState({
        sortDir: 0,
        sortBy: key,
      });
      this.props.dispatch(sortDecBy(key));
    }
  },

  propTypes: {
    state: React.PropTypes.any.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  },

  rowGetter: function(rowIndex) {
    console.log('row index', rowIndex);
    console.log(this.props.state.get(rowIndex).toJS());
    // return this.props.state.get(rowIndex).toArray();
    return this.props.state.get(rowIndex).toJS();
  },

  render() {
    let sortDir = '';
    if (this.state.sortDir) {
      sortDir = ' ↓';
    } else {
      sortDir = ' ↑';
    }
    return (
      <div className='tableBody'>
        <Table
          rowHeight={35}
          rowGetter={this.rowGetter}
          rowsCount={this.props.state.size}
          width={this.state.w}
          height={this.state.h}
          headerHeight={35}>
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'First Name' + (this.state.sortBy === 'firstName' ? sortDir : '')}
          width={100}
          flexGrow={1}
          dataKey='firstName'
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Last Name' + (this.state.sortBy === 'lastName' ? sortDir : '')}
          width={100}
          flexGrow={1}
          dataKey='lastName'
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Date of Birth' + (this.state.sortBy === 'dob' ? sortDir : '')}
          width={80}
          flexGrow={1}
          dataKey='dob'
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Phone Number' + (this.state.sortBy === 'phone' ? sortDir : '')}
          width={80}
          flexGrow={2}
          dataKey='phone'
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Address' + (this.state.sortBy === 'email' ? sortDir : '')}
          width={150}
          flexGrow={1}
          dataKey='email'
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Notes' + (this.state.sortBy === 'notes' ? sortDir : '')}
          width={200}
          flexGrow={3}
          dataKey='notes'
        />
        </Table>
      </div>
    );
  },
});

function select(state) {
  return {state};
}

export const ContactsTable = connect(select)(DisplayTable);
