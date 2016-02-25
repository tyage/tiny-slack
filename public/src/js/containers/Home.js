import React from 'react'
import { connect } from 'react-redux'

import { updateCurrentChannel } from '../actions/channel'
import Sidebar from '../components/Sidebar'
import MessagesSection from './MessagesSection'

const mapStateToProps = (state, { params }) => {
  const channels = state.channels
  let currentChannel = state.currentChannel

  const channelId = params.channelId
  if (channelId !== undefined && (!currentChannel || currentChannel.id !== channelId)) {
    const channel = channels.find(channel => channel.id === channelId)
    if (channel) {
      currentChannel = channel
    }
  }

  return {
    channels,
    currentChannel
  }
}

let Home = ({ channels, currentChannel }) => {
  return (
    <div className="home page">
      <div className="sidebar-section">
        <Sidebar channels={ channels } currentChannel={ currentChannel } />
      </div>
      <MessagesSection currentChannel={ currentChannel } />
    </div>
  )
}

Home = connect(
  mapStateToProps
)(Home)

export default Home