import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './CircleLoading.css';

const CircleLoading = ({ className, width, height, style, ...rest}) => {
  return (
    <span {...rest} style={{ ...style, width, height }}
      className={ classnames('CircleLoading-animation', className ) } />
  )
}

CircleLoading.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

CircleLoading.defaultProps = {
  width: '30px',
  height: '30px',
}

export default CircleLoading;
