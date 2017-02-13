import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import R from 'ramda';
import { fetchPath, saveUserPathStatus, fetchUserPath } from '../../actions';
import * as fromReducers from '../../reducers';
import Milestone from './Milestone';
import UsersInProgressModal from './UsersInProgressModal';
import './PathDetail.css';

const modalInitState = {
  isOpen: false,
  pathUrl: '',
  milestoneId: '',
  milestoneName: '',
};

export class PathDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: modalInitState,
    }
  }
  componentDidMount() {
    const { fetchPath, fetchUserPath, url, isAuthenticated } = this.props;
    fetchPath(url);
    if (isAuthenticated) {
      fetchUserPath(url);
    }
  }
  handleMilestonePercentageChange = (milestone) => {
    const { url, saveUserPathStatus } = this.props;
    const userPath = { pathUrl: url, milestone };
    saveUserPathStatus(userPath);
  }
  isPathDone = userMilestones => R.reduceWhile(
    (an, ac) => an,
    (an, ac) => !!userMilestones[ac.id] && userMilestones[ac.id].percentage === 100,
    true
  );
  toggleModal = modal => {
    this.setState({ modal });
  }
  closeModal = () => {
    this.toggleModal(modalInitState);
  };
  render() {
    const { path, milestones, userMilestones, isAuthenticated } = this.props;
    if(!path) {
      return <p>Path not available</p>
    }
    const { name, description, url } = path;
    const pathDone = this.isPathDone(userMilestones)(milestones);
    return (
      <section className={ classnames({ 'text-center': !isAuthenticated }) }>
        <div className={ classnames('text-center',
          { 'PathDetail-done-color': pathDone }) }
        >
          {
            pathDone ?
            <i className="icon-ok-circled PathDetail-header-icon"></i> :
            <i className="icon-clock-alt PathDetail-header-icon"></i>
          }
          <h3>{ name }</h3>
          <p>{ description }</p>
        </div>
        <div className="PathDetail-milestones">
          {
            milestones.map(
              ({ id, name }) => {
                let percentage = 0;
                if (userMilestones[id]) {
                  percentage = userMilestones[id].percentage;
                }

                return (
                  <div key={ id }>
                    <Milestone
                      name={ name }
                      id={ id }
                      percentage={ percentage }
                      showProgress={ isAuthenticated }
                      onPercentageChange={ this.handleMilestonePercentageChange }
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={ () => this.toggleModal(
                        {
                          isOpen: true,
                          pathUrl: url,
                          milestoneId: id,
                          milestoneName: name
                        })
                      }
                      >
                      Users in progress
                    </button>
                    <hr />
                  </div>
                );
              }
            )
          }
        </div>

        <UsersInProgressModal
          isOpen={ this.state.modal.isOpen }
          onClose={ this.closeModal }
          pathUrl={ this.state.modal.pathUrl }
          milestoneId={ this.state.modal.milestoneId }
          milestoneName={ this.state.modal.milestoneName }
        />
      </section>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const url = match.params.url;
  let path = fromReducers.getPath(state, url);
  let milestones = [];
  let userMilestones = [];
  if(path && path.milestones) {
    milestones = fromReducers.getMilestones(state, path.milestones);
    userMilestones = fromReducers.getUserMilestones(state, path.milestones);
  }

  return {
    url,
    path,
    milestones,
    userMilestones,
    isAuthenticated: fromReducers.isAuthenticated(state),
  }
};

export default connect(
  mapStateToProps,
  { fetchPath, saveUserPathStatus, fetchUserPath }
)(PathDetail);
