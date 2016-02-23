import { connect } from 'react-redux'
import SidebarHeader from '../components/SidebarHeader'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    team: state.team
  }
}

const TeamSidebarHeader = connect(
  mapStateToProps
)(SidebarHeader)

export default TeamSidebarHeader
