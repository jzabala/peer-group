import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import R from 'ramda';
import { fetchPaths, saveUserPathStatus, fetchUserPath } from '../../actions';
import { isNotEmpty } from '../../utils/functions';
import * as fromReducers from '../../reducers';
import Milestone from './Milestone';
import UsersInProgressModal from './UsersInProgressModal';
import DotsLoading from '../loadings/DotsLoading';
import NotFound from '../NotFound';
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
    const { fetchPaths, fetchUserPath, url, isAuthenticated } = this.props;
    fetchPaths(url);
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

  renderMilestones = () => {
    const { path, milestones, userMilestones, isAuthenticated } = this.props;
    return milestones.map(
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
                  pathUrl: path.url,
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
    );
  }
  render() {
    const { path, milestones, userMilestones, isAuthenticated, isFeching } = this.props;

    const pathNotExists = !path;
    let visibleMilestones;
    if(pathNotExists && isFeching) {
      return <DotsLoading style={
        { paddingTop: '50px' }
      }/>
    } else if (pathNotExists) {
      return <NotFound />
    } else if (isFeching) {
      visibleMilestones = <DotsLoading style={
        { paddingTop: '30px' }
      }/>
    } else {
      visibleMilestones = this.renderMilestones();
    }

    const { name, description } = path;
    const pathDone = isNotEmpty(milestones) &&
      this.isPathDone(userMilestones)(milestones);
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
          { visibleMilestones }
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
    isFeching: fromReducers.isFechingPaths(state),
  }
};

export default connect(
  mapStateToProps,
  { fetchPaths, saveUserPathStatus, fetchUserPath }
)(PathDetail);
