import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateCurrentChannel, updateChannels } from '../actions/channel'
import Sidebar from '../components/Sidebar'
import MessagesSection from './MessagesSection'

const mapStateToProps = (state, { params }) => {
  const channels = state.channels
  const currentChannel = channels.find(channel => channel.name === params.channelName)

  return {
    channels,
    currentChannel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateChannels: () => {
      dispatch(updateChannels())
    },
    initCurrentChannel: (channels, currentChannel) => {
      if (!currentChannel && channels.length > 0) {
        const nextChannel = channels[0]
        dispatch(updateCurrentChannel(nextChannel))
      }
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { doUpdateChannels } = this.props
    doUpdateChannels()
  }
  componentWillReceiveProps(nextProps) {
    const { channels, currentChannel, initCurrentChannel } = nextProps
    initCurrentChannel(channels, currentChannel)
  }
  render() {
    const { channels, currentChannel } = this.props
    return (
      <div className="home page">
        <div className="sidebar-section">
          <Sidebar channels={ channels } currentChannel={ currentChannel } />
        </div>
        <MessagesSection currentChannel={ currentChannel } />
      </div>
    )
  }
}

Home.propTypes = {
  channels: PropTypes.array.isRequired,
  doUpdateChannels: PropTypes.func.isRequired,
  initCurrentChannel: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
