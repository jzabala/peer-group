import React, { PropTypes } from 'react';

const FlashMessage = (props) => {
  const { type, strong, text, onClose } = props;
  return (
    <div className={`alert alert-${ type }`} role="alert">
      <button className="close" onClick={ onClose }>
        <span>&times;</span>
      </button>
      <strong>{ strong }</strong> { text }
    </div>
  )
}

FlashMessage.propTypes = {
  type: PropTypes.string.isRequired,
  strong: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default FlashMessage;
