import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getAuthenticatedUsername } from '../../reducers';

class Logout extends Component {
  componentDidMount() {
    const { logout, username } = this.props;
    logout(username);
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  username: getAuthenticatedUsername(state),
});

export default connect(mapStateToProps, { logout })(Logout);
