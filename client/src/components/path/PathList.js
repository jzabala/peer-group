import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import gql from 'graphql-tag';
import { getAllPaths, isFechingPaths } from '../../reducers';
import { fetchPaths } from '../../actions';
import Path from './Path';
import DotsLoading from '../loadings/DotsLoading';

class PathList extends React.Component {
  componentDidMount() {
    this.props.fetchPaths(PathsWithoutMilestones); // eslint-disable-line no-use-before-define
  }
  render() {
    const { paths, isFeching } = this.props;

    let content;
    if (isFeching && R.isEmpty(paths)) {
      content = <DotsLoading style={{ marginTop: '40px' }} />;
    } else {
      content = this.props.paths.map(
          path => <Path key={ path.url }
            name={ path.name }
            url={ path.url }
            description={ path.description }
          />
        );
    }

    return (
      <div className="row justify-content-center">
        { content }
      </div>
  );
  }
}

PathList.propTypes = {
  paths: PropTypes.array.isRequired,
  isFeching: PropTypes.bool.isRequired,
};

const PathsWithoutMilestones = gql`
  query PathsWithoutMilestones {
    paths {
      url
      name
      description
    }
  }
`;

export const mapStateToProps = (state) => ({
  paths: getAllPaths(state),
  isFeching: isFechingPaths(state),
});

export default connect(mapStateToProps, { fetchPaths })(PathList);
