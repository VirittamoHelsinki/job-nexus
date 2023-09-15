import React from 'react';
import logo from '../virittamo-helsinki.webp'; // Adjust the path based on your actual structure

function Header({ onJobFormToggle, onAnalyticsToggle }){
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span style={{color: "white"}}> Nexus</span>
      </div>
      <nav>
        <ul className="navbar">
          <li>
            <button className="link-button" onClick={onJobFormToggle}>Lisää uusi työpaikka</button>
          </li>
          <li>
            <button className="link-button" onClick={onAnalyticsToggle}>Analytiikka</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;