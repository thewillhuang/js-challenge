import React from 'react';
import {Table, Column} from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';

function returnHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 300;
}

function returnWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 100;
}

const DisplayTable = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    window.onresize = this.resize;
    this.filterRowsBy(this.props.query);
  },

  getInitialState: function() {
    return {
      w: returnWidth(),
      h: returnHeight(),
      filteredRows: this.props.state.toArray(),
    };
  },

  headerRender: function(label) {
    return (
      <div className='tableHeader'>{label}</div>
    );
  },

  filterRowsBy: function() {
    const query = this.props.query;
    const filtered = this.props.state.filter((value) => {
      const firstName = value.get('fName');
      if (firstName && query) {
        return (value.get('fName').toLowerCase().indexOf(query.toLowerCase()) >= 0);
      }
      return true;
    });

    this.setState({
      filteredRows: filtered.toJS(),
    });
  },

  resize: function() {
    this.setState({
      w: returnWidth(),
      h: returnHeight(),
    });
  },

  propTypes: {
    state: React.PropTypes.any.isRequired,
    query: React.PropTypes.string,
  },

  rowGetter: function(rowIndex) {
    return _.values(this.state.filteredRows[rowIndex]);
  },

  render() {
    // console.log(this.props);
    return (
      <div className='tableBody'>
        <Table
          rowHeight={35}
          rowGetter={this.rowGetter}
          rowsCount={this.state.filteredRows.length}
          width={this.state.w}
          height={this.state.h}
          headerHeight={35}>
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='First Name'
          width={100}
          flexGrow={1}
          dataKey={0}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='Last Name'
          width={100}
          flexGrow={1}
          dataKey={1}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='Date of Birth'
          width={80}
          flexGrow={1}
          dataKey={2}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='Phone Number'
          width={80}
          flexGrow={2}
          dataKey={3}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='Address'
          width={150}
          flexGrow={1}
          dataKey={4}
        />
        <Column
          allowCellsRecycling
          headerRenderer={this.headerRender}
          label='Notes'
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
