import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isAuthenticated } from '../reducers';

const requireAuth = (WrappedComponent) =>
{
  const RequireAuth = props => {
    const component = props.isAuthenticated ?
    <WrappedComponent { ...props } /> :
    <Redirect to={ props.redirectTo } />;

    return component    
  }
  RequireAuth.propTypes = {
    redirectTo: PropTypes.string,
  }
  RequireAuth.defaultProps = {
    redirectTo: '/login',
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state)
  });
  return connect(mapStateToProps)(RequireAuth);
}

export default requireAuth;
