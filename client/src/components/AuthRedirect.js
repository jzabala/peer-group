import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { isAuthenticated } from '../reducers';

export class AuthRedirect extends React.Component {
  render() {
    const {
      isAuthenticated,
      children,
      onAuthenticate,
      to,
      onUnauthenticate,
    } = this.props;

    let component = children;

    if(isAuthenticated && onAuthenticate && to) {
      component = <Redirect to={ to } />;
    }

    if(!isAuthenticated && onUnauthenticate && to) {
      component = <Redirect to={ to } />;
    }

    return component;
  }
}

AuthRedirect.propTypes = {
  children: PropTypes.object.isRequired,
  onAuthenticate: PropTypes.bool,
  onUnauthenticate: PropTypes.bool,
  to: PropTypes.string,
};

AuthRedirect.defaultProps = {
  onAuthenticate: false,
  onUnauthenticate: false,
};

export const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(AuthRedirect);
