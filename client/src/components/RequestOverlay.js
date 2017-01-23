import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './RequestOverlay.css';

const RequestOverlay = ({ isRequest }) => (
  <div className={
    classnames(
      'RequestOverlay_container',
      {'RequestOverlay_hide-container': !isRequest}
    )
  }>
    <div className="RequestOverlay_spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  </div>
);

RequestOverlay.propTypes = {
  isRequest: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isRequest }) => ({
  isRequest
});

export default connect(mapStateToProps)(RequestOverlay);
