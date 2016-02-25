import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

const createChannel = (name) => {
  return fetch('/api/channels/new', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    })
    .then(res => res.json())
}
const fetchChannels = () => {
  return fetch('/api/channels')
    .then(res => res.json())
}

export const addAndMoveToChannel = (name) => {
  return (dispatch) => {
    let newChannel
    return createChannel(name)
      .then(({ channel }) => {
        // TODO: handle error
        newChannel = channel
        return dispatch(updateChannels())
      })
      .then(() => {
        return dispatch(push(`/${newChannel.id}`))
      })
  }
}
export const updateCurrentChannel = (channel) => {
  return push(`/${channel.id}`)
}
export const updateChannels = () => {
  return (dispatch) => {
    return fetchChannels()
      .then(({ channels }) => {
        return dispatch({
          type: 'UPDATE_CHANNELS',
          channels
        })
      })
  }
}
