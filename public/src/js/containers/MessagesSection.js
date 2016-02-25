import React from 'react'
import { connect } from 'react-redux'
import { postMessage } from '../actions/message'
import MessageList from '../components/MessageList'
import PostMessage from '../components/PostMessage'

const mapStateToProps = (state, ownProps) => {
  const currentChannelId = ownProps.currentChannel ? ownProps.currentChannel.id : null
  const currentChannelMessages = currentChannelId ? state.messages[currentChannelId] : []
  return {
    messages: currentChannelMessages || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostMessage: (currentChannel, username, messageText) => {
      dispatch(postMessage(currentChannel, username, messageText))
    }
  }
}

const MessagesSection = ({ messages, currentChannel, onPostMessage }) => {
  if (currentChannel) {
    return (
      <div className="messages-section">
        <div className="messages-header">
          <div className="title">#{ currentChannel.name }</div>
        </div>
        <MessageList messages={ messages } />
        <PostMessage onSubmit={ (username, messageText) => {
          onPostMessage(currentChannel, username, messageText)
        } } />
      </div>
    )
  } else {
    return <div className="messages-section"></div>
  }
}

const CurrentChannelMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesSection)

export default CurrentChannelMessages
