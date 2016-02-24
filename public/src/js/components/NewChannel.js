import React from 'react';
import PopupPage from './PopupPage';

const NewChannel = () => (
  <div className="new-channel page">
    <PopupPage>
      <h1>Create a new channel</h1>

      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="channel-name">Channel name</label>
          <div className="form-input">
            <input id="channel-name" type="text" placeholder="Channel name" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-input">
            <input type="submit" className="primary-button" value="Create" />
          </div>
        </div>
      </form>
    </PopupPage>
  </div>
)

export default NewChannel
