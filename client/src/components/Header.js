import React from 'react';
import { Link } from 'react-router';
import './Header.css'

const Header = (props) => (
  <nav className="navbar navbar-toggleable-xl navbar-light bg-faded Header_navbar">
    <Link className="navbar-brand" to="/">
      Peer Group
    </Link>

    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="#">New Path</a>
      </li>
    </ul>
    <ul className="navbar-nav navbar-right">
      <li>
        <Link className="nav-link" activeClassName="active" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/signup">
          Sign up
        </Link>
      </li>
    </ul>
  </nav>
);

export default Header;
