import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { logout } from '../../actions/auth';
import { getAuthenticatedUserId } from '../../reducers';

class Logout extends Component {
  componentWillMount() {
    const { logout, userId } = this.props;    
    logout(userId);
  }
  render() {
    return (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  userId: getAuthenticatedUserId(state),
});

export default connect(mapStateToProps, { logout })(Logout);
