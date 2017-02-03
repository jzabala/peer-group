import React from 'react';
import { connect } from 'react-redux';
import { fetchPath } from '../../actions';
import { getPath, getMilestones } from '../../reducers';

export class PathDetail extends React.Component {
  componentDidMount() {
    const { fetchPath, match } = this.props;
    fetchPath(match.params.id);
  }
  render() {
    const { path } = this.props;
    return (
      <section>
        <h3>{ path.name }</h3>
        <p>{ path.description }</p>
      </section>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const path = getPath(state, match.params.id);
  // const milestones = getMilestones(state, path.milestones);
  return {
    path,
    // milestones,
  }
};

export default connect(null, { fetchPath } )(PathDetail);
