import React from 'react';
const Header = React.createClass({
  render() {
    return (
      <div>
        <header className='header'>
          <label className='headerLabel'>Contacts Keeper</label>
        </header>
        <div className='headerSpacing'></div>
      </div>
    );
  },
});

export default Header;
