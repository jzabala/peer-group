import React from 'react';
import './DotsLoading.css';

const DotsLoading = ({ style, dotsStyle }) => (
  <div style={ style } className="DotsLoading_spinner">
    <div style={ dotsStyle } className="bounce1"></div>
    <div style={ dotsStyle } className="bounce2"></div>
    <div style={ dotsStyle } className="bounce3"></div>
  </div>
);

DotsLoading.propTypes = {
  style: React.PropTypes.object,
  dotsStyle: React.PropTypes.object,
}

DotsLoading.defaultProps = {
  dotsStyle: {},
  style: {},
}
export default DotsLoading;
