import React from 'react';
import { connect } from 'react-redux';
import { fetchPath, saveUserPathStatus } from '../../actions';
import * as fromReducers from '../../reducers';
import Milestone from './Milestone';
import './PathDetail.css';

export class PathDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  componentDidMount() {
    const { fetchPath, url } = this.props;
    fetchPath(url);
  }
  handleStatusChange(milestone) {
    const { url, saveUserPathStatus } = this.props;
    const userPath = { pathUrl: url, milestone };
    saveUserPathStatus(userPath);
  }
  render() {
    const { path, milestones, userMilestones } = this.props;

    if(!path) {
      return <p>Path not available</p>
    }

    const { name, description } = path;
    return (
      <section>
        <div className="text-center">
          <h3>{ name }</h3>
          <p>{ description }</p>
        </div>
        <div className="PathDetail-milestones">
          {
            milestones.map(
              ({ id, name }) => (
                <Milestone
                  key={ id }
                  name={ name }
                  id={ id }
                  status={ userMilestones[id] ? userMilestones[id].status : '' }
                  onStatusChange={ this.handleStatusChange }
                />
              )
            )
          }
        </div>
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
    userMilestones
  }
};

export default connect(
  mapStateToProps,
  { fetchPath, saveUserPathStatus }
)(PathDetail);
