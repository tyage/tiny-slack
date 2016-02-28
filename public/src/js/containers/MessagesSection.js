import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { postMessage, updateMessages, listenNewMessage, unlistenNewMessage } from '../actions/message'
import MessageList from '../components/MessageList'
import PostMessage from '../components/PostMessage'

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doPostMessage: (channel, username, text) => {
      if (channel) {
        dispatch(postMessage(channel, username, text))
      }
    },
    doUpdateMessages: (channel) => {
      if (channel) {
        dispatch(updateMessages(channel))
      }
    },
    doListenNewMessage: (channel) => {
      if (channel) {
        dispatch(listenNewMessage(channel))
      }
    }
  }
}

class MessagesSection extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { currentChannel, doUpdateMessages, doListenNewMessage } = this.props
    doUpdateMessages(currentChannel)
    doListenNewMessage(currentChannel)
  }
  componentWillUnmount() {
    unlistenNewMessage()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChannel !== this.props.currentChannel) {
      const { currentChannel, doUpdateMessages, doListenNewMessage } = nextProps
      doUpdateMessages(currentChannel)
      unlistenNewMessage()
      doListenNewMessage(currentChannel)
    }
  }
  render() {
    const { messages, currentChannel, doPostMessage } = this.props

    if (currentChannel) {
      return (
        <div className="messages-section">
          <div className="messages-header">
            <div className="title">#{ currentChannel.name }</div>
          </div>
          <MessageList messages={ messages } />
          <PostMessage onSubmit={ (username, text) => {
            doPostMessage(currentChannel, username, text)
          } } />
        </div>
      )
    } else {
      return <div className="messages-section"></div>
    }
  }
}

MessagesSection.propTypes = {
  messages: PropTypes.array.isRequired,
  doPostMessage: PropTypes.func.isRequired,
  doUpdateMessages: PropTypes.func.isRequired,
  doListenNewMessage: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesSection)
