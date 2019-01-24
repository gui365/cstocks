import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <p><span className="bold">Guillermo Barila</span> | Coding Challenge, Xfinity Mobile</p>
      <img className="header-logo" src="./favicon.png" alt="Xfinity Mobile Logo" />
      <p>1/23/19 - 1/25/19</p>
    </div>
  )
}

export default Header;