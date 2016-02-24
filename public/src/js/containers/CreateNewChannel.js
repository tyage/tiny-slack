import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addChannel } from '../actions/channel'

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (channelName) => {
      dispatch(addChannel(channelName))
      dispatch(push('/'))
    }
  }
}

let CreateNewChannel = ({ onSubmit }) => {
  let channelName

  return (
    <form onSubmit={ (e) => {
      e.preventDefault()
      onSubmit(channelName.value)
      channelName.value = ''
    } }>
      <div className="form-group">
        <label className="form-label" htmlFor="channel-name">Channel name</label>
        <div className="form-input">
          <input id="channel-name" type="text" placeholder="Channel name"
            ref={ node => channelName = node } />
        </div>
      </div>
      <div className="form-group">
        <div className="form-input">
          <input type="submit" className="primary-button" value="Create" />
        </div>
      </div>
    </form>
  )
}
CreateNewChannel = connect(
  null,
  mapDispatchToProps
)(CreateNewChannel)

export default CreateNewChannel
