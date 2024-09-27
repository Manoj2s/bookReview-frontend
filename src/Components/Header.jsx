import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="title">BookS</div>
      <div className="search-bar">
      <input type="text" placeholder="Search..." />
        <button type="button" className="search-button">Search</button>
        
      </div>
    </header>
  );
};

export default Header;
