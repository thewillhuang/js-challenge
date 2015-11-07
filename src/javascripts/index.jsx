import React from 'react';
import { render } from 'react-dom';

const rootElement = document.getElementById('root');

const Root = React.createClass({
  render() {
    return (
      <div>
        hello
      </div>
    );
  },
});

render((
  <Root />
), rootElement);
