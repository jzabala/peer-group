import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getAuthenticatedUserId } from '../../reducers';

class Logout extends Component {
  componentWillMount() {
    const { logout, userId } = this.props;
    logout(userId);
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  userId: getAuthenticatedUserId(state),
});

export default connect(mapStateToProps, { logout })(Logout);
