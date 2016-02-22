import { connect } from 'react-redux'
import SidebarHeader from '../components/SidebarHeader'

const mapStateToProps = (state) => {
  return {
    team: state.team
  }
}

const TeamSidebarHeader = connect(
  mapStateToProps
)(SidebarHeader)

export default TeamSidebarHeader
