import React, { Component, PropTypes } from 'react'
import Message from './Message'

class MessageList extends Component {
  constructor(props) {
    super(props)

    this.autoScroll = true
  }
  componentDidMount() {
    const messageList = this.refs.messageList
    messageList.addEventListener('scroll', (e) => {
      const rawHeight = getComputedStyle(messageList).height || ''
      const heightMatch = rawHeight.match(/(\d+)px/)
      const height = heightMatch ? +heightMatch[1] : 0
      this.autoScroll = messageList.scrollHeight <= messageList.scrollTop + height
    })
  }
  componentWillUnmount() {
    const messageList = this.refs.messageList
    messageList.removeEventListener('scroll')
  }
  componentDidUpdate() {
    this.scrollMessages()
  }
  scrollMessages() {
    if (this.autoScroll) {
      const messageList = this.refs.messageList
      messageList.scrollTop = messageList.scrollHeight
    }
  }
  render() {
    const { messages } = this.props

    return (
      <div className="message-list" ref="messageList">
        { messages.map((message) => (
          <Message
            message={ message }
            key={ message._id }
          />
        )) }
      </div>
    )
  }
}

export default MessageList
