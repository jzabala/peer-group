import React, { PropTypes } from 'react';
import './RequestButton.css';

const RequestButton = (props) => {
  const { children, className, request, ...rest } = props;
  return (
    <button {...rest} className={ `${className} RequestButton_resquest`} disabled={ request }>
      { children }
    </button>
  )
};

RequestButton.propTypes = {
  children: PropTypes.string.isRequired,
  request: PropTypes.bool.isRequired,
  type: PropTypes.string,
}

RequestButton.defaultProps = {
  type: 'submit',
}

export default RequestButton;
