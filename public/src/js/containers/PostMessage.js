import React from 'react'
import { connect } from 'react-redux'
import { postMessage } from '../actions/message'

const mapStateToProps = (state) => {
  return {
    currentChannel: state.currentChannel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (currentChannel, username, messageText) => {
      dispatch(postMessage(currentChannel, username, messageText))
    }
  }
}

let PostMessage = ({ currentChannel, onSubmit }) => {
  let messageText, username

  return (
    <form onSubmit={ (e) => {
      e.preventDefault()
      onSubmit(currentChannel, username.value, messageText.value)
      messageText.value = ''
    } } className="post-message-form">
      <div className="username-form form-input">
        <input type="text" placeholder="Username"
          ref={ node => username = node } />
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
PostMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostMessage)

export default PostMessage
