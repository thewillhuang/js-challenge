import React from 'react';
import { connect } from 'react-redux';

const App = React.createClass({
  render() {
    console.log(this.props);
    return (
      <div>
        hello
      </div>
    );
  },
});

function select(state) {
  return {state};
}

export const Root = connect(select)(App);
