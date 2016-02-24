import React from 'react'
import PopupPage from './PopupPage'
import CreateNewChannel from '../containers/CreateNewChannel'

const NewChannel = () => (
  <div className="new-channel page">
    <PopupPage>
      <h1 className="page-title">Create a new channel</h1>

      <CreateNewChannel />
    </PopupPage>
  </div>
)

export default NewChannel
