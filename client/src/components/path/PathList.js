import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { getAllPaths } from '../../reducers';
import { fetchPaths } from '../../actions';
import Path from './Path';

export class PathList extends React.Component {
  componentDidMount() {
    this.props.fetchPaths();
  }
  render() {
    const content = R.isEmpty(this.props.paths) ?
      <p>The aren't paths </p> :
      this.props.paths.map(
        path => <Path key={ path.url }
          name={ path.name }
          url={ path.url }
          description={ path.description }
        />
      );

    return (
      <div className="row justify-content-center">
        { content }
      </div>
  );
  }
}

export const mapStateToProps = (state) => ({
  paths: getAllPaths(state),
});

export default connect(mapStateToProps, { fetchPaths })(PathList);
