import React from 'react';
import { connect } from 'react-redux'

import Channel from '../components/Channel'
import { updateCurrentChannel } from '../actions/channel'

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelClick: (channel) => {
      dispatch(updateCurrentChannel(channel))
    }
  }
}

const ChannelList = ({ dispatch, channels, onChannelClick, currentChannel }) => {
  return (
    <div className="channel-list">
      { channels.map((channel) => (
        <Channel
          channel={ channel }
          onClick={ () => onChannelClick(channel) }
          isSelected={ channel === currentChannel }
          key={ channel.id }
        />
      )) }
    </div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(ChannelList)
