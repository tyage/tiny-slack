import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { postMessage, updateMessages } from '../actions/message'
import MessageList from '../components/MessageList'
import PostMessage from '../components/PostMessage'

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostMessage: (channel, username, text) => {
      dispatch(postMessage(channel, username, text))
    },
    doUpdateMessages: (channel) => {
      if (channel) {
        dispatch(updateMessages(channel))
      }
    }
  }
}

class MessagesSection extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { currentChannel, doUpdateMessages } = this.props
    doUpdateMessages(currentChannel)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentChannel !== this.props.currentChannel) {
      const { currentChannel, doUpdateMessages } = nextProps
      doUpdateMessages(currentChannel)
    }
  }
  render() {
    const { messages, currentChannel, onPostMessage } = this.props

    if (currentChannel) {
      return (
        <div className="messages-section">
          <div className="messages-header">
            <div className="title">#{ currentChannel.name }</div>
          </div>
          <MessageList messages={ messages } />
          <PostMessage onSubmit={ (username, text) => {
            onPostMessage(currentChannel, username, text)
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
  onPostMessage: PropTypes.func.isRequired,
  doUpdateMessages: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesSection)
