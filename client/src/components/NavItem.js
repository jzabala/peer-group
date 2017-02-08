import React from 'react';
import { Route, Link } from 'react-router-dom';
import classnames from 'classnames';

const NavItem = ({ to, ...rest }) => (
  <Route path={ to } children={({ match }) => (
    <li className={ classnames('nav-item', { 'active': match }) }>
      <Link className='nav-link' to={ to } { ...rest } />
    </li>
  )}/>
);

export default NavItem;
