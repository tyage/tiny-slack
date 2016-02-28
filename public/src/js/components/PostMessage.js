import React from 'react'

const PostMessage = ({ onSubmit }) => {
  const defaultUsername = localStorage.getItem('defaultUsername')
  let messageText, username

  return (
    <form onSubmit={ (e) => {
      e.preventDefault()
      onSubmit(username.value, messageText.value)
      messageText.value = ''
    } } className="post-message-form">
      <div className="username-form form-input">
        <input type="text" placeholder="Username"
          ref={ node => username = node }
          defaultValue={ defaultUsername } />
      </div>
      <div className="message-form form-input">
        <input type="text" placeholder="Input message"
          ref={ node => messageText = node } />
      </div>
      <div className="submit-form">
        <input type="submit" className="primary-button" value="Post" />
      </div>
    </form>
  )
}

export default PostMessage
