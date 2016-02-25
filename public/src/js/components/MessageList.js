import React from 'react';
import Message from './Message'

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      { messages.map((message) => (
        <Message
          message={ message }
          key={ message.id }
        />
      )) }
    </div>
  )
}

export default MessageList
