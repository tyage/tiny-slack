import React from 'react';
import { connect } from 'react-redux'
import Channel from '../components/Channel'
import { updateCurrentChannel } from '../actions/channel'

const mapStateToProps = (state) => {
  return {
    channels: state.channels,
    currentChannel: state.currentChannel
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChannelClick: (channel) => {
      dispatch(updateCurrentChannel(channel))
    }
  }
}

let ChannelList = ({ dispatch, channels, onChannelClick, currentChannel }) => {
  return (
    <div className="channel-list">
      { channels.map((channel) => (
        <Channel
          channel={ channel }
          onClick={ () => onChannelClick(channel) }
          isSelected={ channel === currentChannel }
        />
      )) }
    </div>
  )
}
ChannelList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList)

export default ChannelList
