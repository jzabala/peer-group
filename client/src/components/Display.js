import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isAuthenticated } from '../reducers';

export class Display extends React.Component {
  render() {
    const { isAuthenticated, children } = this.props;

    if(this.props.authenticated && isAuthenticated) {
      return children;
    }

    if(this.props.unAuthenticated && !isAuthenticated) {
      return children;
    }

    return null;
  }
}

Display.propTypes = {
  children: PropTypes.object.isRequired,
  authenticated: PropTypes.bool,
  unAuthenticated: PropTypes.bool,
};

Display.defaultProps = {
  authenticated: false,
  unAuthenticated: false,
};

export const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(Display);
