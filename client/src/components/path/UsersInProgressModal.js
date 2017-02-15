import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { fetchUsersInProgress } from '../../actions';
import Modal from '../common/Modal';
import DotsLoading from '../loadings/DotsLoading';

class UsersInProgressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    const { pathUrl, milestoneId } = nextProps;
    if (pathUrl && milestoneId) {
      this.setState({
        users: [],
        isLoading: true,
        errors: {},
      });
      fetchUsersInProgress(pathUrl, milestoneId).then(
        users => this.setState({
          users,
          isLoading: false,
        }),
        errors => this.setState({
          errors,
          isLoading: false,
        }),
      );
    }
  }
  render() {
    const { isOpen, onClose, milestoneName } = this.props;
    const { errors, users, isLoading } = this.state;
    let content;
    if (R.empty(users) && isLoading) {
      content = <DotsLoading
        style={{ margin: '0px', }}
        dotsStyle={{ width: '14px', height: '14px' }}
      />;
    } else {
      content = !R.isEmpty(errors) ? errors.general :
        users.map(({username}) => <li key={ username }>{ username }</li>);
    }

    return (
      <Modal isOpen={ isOpen } onClose={ onClose }>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Users in progress on - { milestoneName }</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={ onClose }
              >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className="text-left">
              { content }
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={ onClose }
              >Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}

UsersInProgressModal.propTypes = {
  pathUrl: PropTypes.string.isRequired,
  milestoneId: PropTypes.string.isRequired,
  milestoneName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default UsersInProgressModal;
