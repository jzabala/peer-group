import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './auth/Auth';
import NavItem from './NavItem';
import './Header.css'

const Header = (props) => (
  <nav className="navbar navbar-toggleable-xl navbar-light bg-faded Header_navbar">
    <Link className="navbar-brand" to="/">
      Learning Path
    </Link>

    <ul className="navbar-nav mr-auto">
      <Auth render={
        ({ isAuth }) => isAuth ? <NavItem to="/new-path" children="New Path" /> : null
      }/>
    </ul>

    <ul className="navbar-nav navbar-right">
      <Auth render={
        ({ isAuth }) => !isAuth ? <NavItem to="/login" children="Login" /> : null
      }/>
      <Auth render={
        ({ isAuth }) => !isAuth ? <NavItem to="/signup" children="Sign up" /> : null
      }/>
      <Auth render={
        ({ isAuth }) => isAuth ? <NavItem to="/logout" children="Logout" /> : null
      }/>
    </ul>
  </nav>
);

export default Header;
