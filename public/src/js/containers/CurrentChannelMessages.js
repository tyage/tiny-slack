import { connect } from 'react-redux'
import MessageList from '../components/MessageList'

const mapStateToProps = (state) => {
  const currentChannelId = state.currentChannel ? state.currentChannel.id : null
  const currentChannelMessages = currentChannelId ? state.messages[currentChannelId] : []
  return {
    messages: currentChannelMessages || []
  }
}

const CurrentChannelMessages = connect(
  mapStateToProps
)(MessageList)

export default CurrentChannelMessages
