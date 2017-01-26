import React from 'react';
import {connect} from 'react-redux';
import FlashMessage from './FlashMessage';
import { removeFlashMessage, updateFlashMessage } from '../../actions/flashMessages';
import './FlashMessageList.css'

export class FlashMessageList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteFlashMessages = this.handleDeleteFlashMessages.bind(this);
  }
  handleDeleteFlashMessages() {
    const { flashMessages, removeFlashMessage, updateFlashMessage } = this.props;
    flashMessages.forEach((message, index) => {
      if (message.duration > 0 && !message.timeout) {        
        setTimeout(() => removeFlashMessage(index), message.duration);
        updateFlashMessage(index, { timeout: true });
      }
    });
  }
  componentDidMount() {
    this.handleDeleteFlashMessages();
  }
  componentDidUpdate() {
    this.handleDeleteFlashMessages();
  }
  render() {
    const { flashMessages, removeFlashMessage } = this.props;
    return (
      <div className="FlashMessageList_container">
        {
          flashMessages.map((message, i) =>
            <FlashMessage
              onClose={ () => removeFlashMessage(i) }
              { ...message } key={ i }
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flashMessages: state.flashMessages,
});

export default connect(
  mapStateToProps,
  { removeFlashMessage, updateFlashMessage })(FlashMessageList);
