import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getAuthenticatedUsername, isAuthenticated } from '../../reducers';

class Logout extends Component {
  componentDidMount() {
    const { logout, username, goBack, isAuthenticated } = this.props;
    if (isAuthenticated) {
      logout(username);
    }
    goBack();
  }
  render() {
    return  null;
  }
}

const mapStateToProps = (state) => ({
  username: getAuthenticatedUsername(state),
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps, { logout })(Logout);
