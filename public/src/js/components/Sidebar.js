import React from 'react';
import { Link } from 'react-router'
import TeamSidebarHeader from '../containers/TeamSidebarHeader'
import ChannelList from '../containers/ChannelList'

const Sidebar = ({ channels, currentChannel }) => (
  <div className="sidebar">
    <TeamSidebarHeader />
    <div className="channels-section">
      <div className="create-channel-link">
        <Link to="/channels/new">+ New Channel</Link>
      </div>
      <ChannelList channels={ channels } currentChannel={ currentChannel } />
    </div>
  </div>
)

export default Sidebar
