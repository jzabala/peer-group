import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isAuthenticated } from '../reducers';

const requireAuth = (WrappedComponent) =>
{
  class RequireAuth extends React.Component {
    render() {
      return (
        <div>
          { this.props.isAuthenticated ?
              <WrappedComponent { ...this.props } /> :
              <Redirect to={ this.props.redirectTo } />
          }
        </div>
      );
    }
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
