import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateCurrentChannel, updateChannels } from '../actions/channel'
import Sidebar from '../components/Sidebar'
import MessagesSection from './MessagesSection'

const mapStateToProps = (state, { params }) => {
  const channels = state.channels
  const currentChannel = channels.find(channel => channel.id === params.channelId)

  return {
    channels,
    currentChannel
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(updateChannels())
  }
  componentWillReceiveProps(nextProps) {
    const { currentChannel, channels, dispatch } = nextProps
    if (!currentChannel && channels.length > 0) {
      const nextChannel = channels[0]
      dispatch(updateCurrentChannel(nextChannel))
    }
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
  dispatch: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps
)(Home)
