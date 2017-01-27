import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { isAuthenticated } from '../reducers';

export class Authenticated extends React.Component {
  render() {
    const { isAuthenticated, children } = this.props;

    return isAuthenticated ? children : null;
  }
}

export const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
})

Authenticated.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Authenticated);
