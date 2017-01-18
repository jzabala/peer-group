import React from 'react';

const Header = (props) => (
  <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
    <a className="navbar-brand" href="#">Peer Group</a>

    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="#">New Path</a>
      </li>
    </ul>
    <ul className="navbar-nav navbar-right">
      <li className="nav-item">
        <a href="#" className="nav-link">Sign up</a>
      </li>
    </ul>
  </nav>
);

export default Header;
