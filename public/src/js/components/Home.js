import React from 'react';
import Sidebar from './Sidebar';
import CurrentChannelMessages from '../containers/CurrentChannelMessages';
import PostMessage from '../containers/PostMessage';

const Home = () => (
  <div className="home page">
    <div className="sidebar-section">
      <Sidebar />
    </div>
    <div className="messages-section">
      <CurrentChannelMessages />
      <PostMessage />
    </div>
  </div>
)

export default Home
