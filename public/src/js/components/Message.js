import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message-section">
      <div className="message-header">
        <p className="message-username">{ message.username }</p>
        <p className="message-date">{ message.createdAt.toLocaleString() }</p>
      </div>
      <pre className="message-text">{ message.text }</pre>
    </div>
  )
}

export default Message
