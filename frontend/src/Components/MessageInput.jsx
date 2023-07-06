import React from 'react';

const MessageList = ({ messages }) => {
    return (
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
    );
  };
export default MessageList;
