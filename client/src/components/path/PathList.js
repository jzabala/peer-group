import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { getAllPaths, isFechingPaths } from '../../reducers';
import { fetchPaths } from '../../actions';
import Path from './Path';
import DotsLoading from '../loadings/DotsLoading';

export class PathList extends React.Component {
  componentDidMount() {
    this.props.fetchPaths();
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

export const mapStateToProps = (state) => ({
  paths: getAllPaths(state),
  isFeching: isFechingPaths(state),
});

export default connect(mapStateToProps, { fetchPaths })(PathList);
