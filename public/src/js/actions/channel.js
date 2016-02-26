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
    return createChannel(name)
      .then((res) => {
        if (res.error) {
          return Promise.reject(res.error)
        } else {
          dispatch(updateChannels())
          return dispatch(push(`/${res.channel.name}`))
        }
      })
  }
}
export const updateCurrentChannel = (channel) => {
  return push(`/${channel.name}`)
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
