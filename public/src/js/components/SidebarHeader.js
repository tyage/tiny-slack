import React, { PropTypes } from 'react'

const SidebarHeader = ({ team }) => (
  <div className="sidebar-header">
    <div className="team-info">
      <span className="team-name">{ team.name }</span>
    </div>
  </div>
)

SidebarHeader.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default SidebarHeader
