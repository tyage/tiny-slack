import { connect } from 'react-redux'
import SidebarHeader from '../components/SidebarHeader'

const mapStateToProps = (state) => {
  return {
    team: state.team
  }
}

export default connect(
  mapStateToProps
)(SidebarHeader)
