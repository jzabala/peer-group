import React from 'react';
import './DotsLoading.css';

const DotsLoading = ({ style, styleDots }) => (
  <div style={ style } className="DotsLoading_spinner">
    <div style={ styleDots } className="bounce1"></div>
    <div style={ styleDots } className="bounce2"></div>
    <div style={ styleDots } className="bounce3"></div>
  </div>
);

DotsLoading.propTypes = {
  style: React.PropTypes.object,
  styleDots: React.PropTypes.object,
}

DotsLoading.defaultProps = {
  styleDots: {},
  style: {},
}
export default DotsLoading;
