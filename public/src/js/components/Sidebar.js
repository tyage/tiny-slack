import React from 'react';
import { Link } from 'react-router'
import TeamSidebarHeader from '../containers/TeamSidebarHeader'
import ChannelList from '../containers/ChannelList'

const Sidebar = () => (
  <div className="sidebar">
    <TeamSidebarHeader />
    <Link to="/channels/new">Create New Channel</Link>
    <div className="channels-section">
      <ChannelList />
    </div>
  </div>
)

export default Sidebar
