import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../reducers';

const Auth = ({ render, ...rest  }) =>
  render(rest);

Auth.propTypes = {
  render: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: isAuthenticated(state)
});

export default connect(mapStateToProps)(Auth);
