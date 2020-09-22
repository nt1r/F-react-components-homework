import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  render() {
    const { text, onTextChange, onClickSendButton } = this.props;
    return (
      <footer className="ChatInput">
        <input type="text" value={text} onChange={onTextChange} />
        <button type="button" onClick={onClickSendButton}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
