import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentPath } from '../../actions';
import * as fromReducers from '../../reducers';

export class PathDetail extends React.Component {
  componentDidMount() {
    const { fetchCurrentPath, match } = this.props;
    fetchCurrentPath(match.params.id);
  }
  render() {
    const { isFeching, currentPathId, milestones } = this.props;
    if(isFeching) {
      return <p>Loading...</p>
    }

    if(!currentPathId) {
      return <p>Path not available</p>
    }

    return (
      <ul>
      {
        milestones.map(
          milestone => <li key={ milestone.id }>{ milestone.name }</li>
        )
      }
      </ul>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const isFeching = fromReducers.getCurrentPathIsFeching(state);
  const currentPathId = fromReducers.getCurrentPathId(state);
  let path;
  let milestones;
  if(currentPathId) {
    path = fromReducers.getPath(state, currentPathId);
    milestones = fromReducers.getMilestones(state, path.milestones);
  }
  return {
    isFeching,
    currentPathId,
    path,
    milestones,
  }
};

export default connect(mapStateToProps, { fetchCurrentPath } )(PathDetail);
