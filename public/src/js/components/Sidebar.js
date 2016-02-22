import React from 'react';
import SidebarHeader from './SidebarHeader';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SidebarHeader />
      </div>
    );
  }
}
