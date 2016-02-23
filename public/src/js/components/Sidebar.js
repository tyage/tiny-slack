import React from 'react';
import TeamSidebarHeader from '../containers/TeamSidebarHeader'
import ChannelList from '../containers/ChannelList'

const Sidebar = () => (
  <div className="sidebar">
    <TeamSidebarHeader />
    <div className="channels-section">
      <ChannelList />
    </div>
  </div>
)

export default Sidebar
