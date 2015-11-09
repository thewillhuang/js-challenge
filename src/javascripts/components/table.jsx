import React from 'react';
import {Table, Column} from 'fixed-data-table';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  sortAscBy,
  sortDecBy,
} from '../actions/actions.js';
import { setAddressBook } from '../actions/actions.js';

const local = JSON.parse(localStorage.getItem('contacts'));

function returnHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 300;
}

function returnWidth() {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 100;
  if (width <= 945) {
    return 945;
  }
  return width;
}

const DisplayTable = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    window.onresize = this.resize;
    if (local) {
      this.props.dispatch(setAddressBook(JSON.parse(localStorage.getItem('contacts'))));
    }
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

  // filterRowsBy: function() {
  //   console.log('called filterRows');
  //   const query = this.props.query;
  //   const filtered = this.props.state.filter((value) => {
  //     const firstName = value.get('fName');
  //     if (firstName && query) {
  //       return (value.get('fName').toLowerCase().indexOf(query.toLowerCase()) >= 0);
  //     }
  //     return true;
  //   });
  //
  //   this.setState({
  //     filteredRows: filtered.toJS(),
  //   });
  // },

  resize: function() {
    this.setState({
      w: returnWidth(),
      h: returnHeight(),
    });
  },

  sortBy: function(key) {
    // console.log(key);
    const keyMap = {
      0: 'firstName',
      1: 'lastName',
      2: 'dob',
      3: 'phone',
      4: 'email',
      5: 'notes',
    };

    if (this.state.sortDir === 0) {
      this.setState({
        sortDir: 1,
        sortBy: key,
      });
      this.props.dispatch(sortAscBy(keyMap[key]));
    } else {
      this.setState({
        sortDir: 0,
        sortBy: key,
      });
      this.props.dispatch(sortDecBy(keyMap[key]));
    }
  },

  propTypes: {
    state: React.PropTypes.any.isRequired,
    query: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
  },

  rowGetter: function(rowIndex) {
    return this.props.state.get(rowIndex).toArray();
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
          label={'First Name' + (this.state.sortBy === 0 ? sortDir : '')}
          width={100}
          flexGrow={1}
          dataKey={0}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Last Name' + (this.state.sortBy === 1 ? sortDir : '')}
          width={100}
          flexGrow={1}
          dataKey={1}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Date of Birth' + (this.state.sortBy === 2 ? sortDir : '')}
          width={80}
          flexGrow={1}
          dataKey={2}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Phone Number' + (this.state.sortBy === 3 ? sortDir : '')}
          width={80}
          flexGrow={2}
          dataKey={3}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Address' + (this.state.sortBy === 4 ? sortDir : '')}
          width={150}
          flexGrow={1}
          dataKey={4}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label={'Notes' + (this.state.sortBy === 5 ? sortDir : '')}
          width={200}
          flexGrow={3}
          dataKey={5}
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
