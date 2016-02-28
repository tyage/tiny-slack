import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Channel from '../components/Channel'
import { updateCurrentChannel, listenNewChannel, unlistenNewChannel } from '../actions/channel'

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelClick: (channel) => {
      dispatch(updateCurrentChannel(channel))
    },
    doListenNewChannel: () => {
      dispatch(listenNewChannel())
    }
  }
}

class ChannelList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { doListenNewChannel } = this.props
    doListenNewChannel()
  }
  componentWillUnmount() {
    unlistenNewChannel()
  }
  render() {
    const { channels, onChannelClick, currentChannel } = this.props
    return (
      <div className="channel-list">
        { channels.map((channel) => (
          <Channel
            channel={ channel }
            onClick={ () => onChannelClick(channel) }
            isSelected={ channel === currentChannel }
            key={ channel._id }
          />
        )) }
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChannelList)
