import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { SingleMessage } from '../SingleMessage/SingleMessage';

import './Messages.css';

export const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, index) => (
        <div key={index}>
          <SingleMessage message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  )
}
