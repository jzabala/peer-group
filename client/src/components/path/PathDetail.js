import React from 'react';
import { connect } from 'react-redux';
import { fetchPath, saveUserPathStatus, fetchUserPath } from '../../actions';
import * as fromReducers from '../../reducers';
import Milestone from './Milestone';
import './PathDetail.css';

export class PathDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleMilestonePercentageChange = this.handleMilestonePercentageChange.bind(this);
  }
  componentDidMount() {
    const { fetchPath, fetchUserPath, url } = this.props;
    fetchPath(url);
    fetchUserPath(url);
  }
  handleMilestonePercentageChange(milestone) {
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
              ({ id, name }) => {
                let status = '';
                let percentage = 0;
                if (userMilestones[id]) {
                  status = userMilestones[id].status;
                  percentage = userMilestones[id].percentage;
                }

                return (
                  <Milestone
                    key={ id }
                    name={ name }
                    id={ id }
                    status={ status }
                    percentage={ percentage }
                    onPercentageChange={ this.handleMilestonePercentageChange }
                  />
                );
              }
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
  { fetchPath, saveUserPathStatus, fetchUserPath }
)(PathDetail);
