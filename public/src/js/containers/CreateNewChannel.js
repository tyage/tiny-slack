import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addChannel } from '../actions/channel'

let CreateNewChannel = ({ dispatch }) => {
  let channelName

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addChannel(channelName.value))
    channelName.value = ''
    dispatch(push('/'))
  }

  return (
    <form onSubmit={ onSubmit }>
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
CreateNewChannel = connect()(CreateNewChannel)

export default CreateNewChannel
