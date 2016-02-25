import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <p>{ message.text }</p>
    </div>
  )
}

export default Message
