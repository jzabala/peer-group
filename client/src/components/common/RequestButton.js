import React, { PropTypes } from 'react';
import CircleLoading from '../loadings/CircleLoading';

const RequestButton = (props) => {
  const { children, className, disabled, ...rest } = props;
  if (disabled) {
    return <CircleLoading style={{ margin: "0 auto" }} className="RequestButton_btn"/>
  }

  return (
    <button {...rest} className={ className }>
      { children }
    </button>
  )
};

RequestButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
}

RequestButton.defaultProps = {
  type: 'submit',
}

export default RequestButton;
