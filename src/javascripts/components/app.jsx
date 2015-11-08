import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Body from './body.jsx';

export const Root = React.createClass({
  render() {
    return (
      <div className='appBase'>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  },
});
