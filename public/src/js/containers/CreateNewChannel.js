import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addAndMoveToChannel } from '../actions/channel'

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (channelName) => {
      return dispatch(addAndMoveToChannel(channelName))
    }
  }
}

class CreateNewChannel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null
    }
  }
  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.channelName.value)
      .catch((error) => {
        this.setState({
          error: error
        })
      })
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-error">{ this.state.error }</div>
        <div className="form-group">
          <label className="form-label" htmlFor="channel-name">Channel name</label>
          <div className="form-input">
            <input id="channel-name" type="text" placeholder="Channel name"
              ref="channelName" required />
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
}

export default connect(
  null,
  mapDispatchToProps
)(CreateNewChannel)
