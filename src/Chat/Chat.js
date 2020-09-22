import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
      inputText: '',
    };
  }

  componentDidMount() {
    const responseMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    this.updateMessageInBox(responseMessage.text, ROLE.ROBOT);
  }

  onClickSendButton = () => {
    const { inputText } = this.state;
    this.updateMessageInBox(inputText, ROLE.CUSTOMER);

    const responseMessage = answersData.find((answer) => answer.tags.includes(inputText));
    if (responseMessage !== undefined) {
      this.updateMessageInBox(responseMessage.text, ROLE.ROBOT);
    }

    this.setState({
      inputText: '',
    });
  };

  onTextChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  updateMessageInBox = (message, role) => {
    const updateMessage = {
      role,
      text: message,
    };

    setTimeout(
      () => {
        this.setState((prev) => ({
          shop: shopData,
          messages: prev.messages.concat(updateMessage),
        }));
      },
      role === ROLE.ROBOT ? 1000 : 0
    );
  };

  render() {
    const { shop, messages, inputText } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput
          text={inputText}
          onTextChange={this.onTextChange}
          onClickSendButton={this.onClickSendButton}
        />
      </main>
    );
  }
}

export default Chat;
