import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.body.classList.toggle('Modal-open', this.props.isOpen);
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('Modal-open', nextProps.isOpen)
  }
  componentWillUnmount() {
    document.body.classList.remove('Modal-open');
  }
  render() {
    const { isOpen, onClose, children } = this.props;
    if (!isOpen) {
      return null;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="Model"
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnter={false}
        transitionLeave={false}>

        <div className="modal Modal-modal"
          style={{ display: 'block' }}
          role="dialog"
          onClick={ onClose }
        >
          <div className="modal-dialog" role="document"
            onClick={ e => e.stopPropagation() }
          >
            { children }
          </div>
        </div>

      </ReactCSSTransitionGroup>
    )
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal
