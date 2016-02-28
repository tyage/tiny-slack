import { push } from 'react-router-redux'

import socket from '../lib/socket'

const createChannel = (name) => {
  return new Promise((resolve, reject) => {
    socket.emit('create channel', { name })

    socket.once('create channel result', (response) => {
      if (response.result === 'success') {
        resolve(response)
      } else {
        reject(response.message)
      }
    })
  })
}
const fetchChannels = () => {
  return new Promise((resolve, reject) => {
    socket.emit('get channels')

    socket.once('channels', (response) => {
      resolve(response)
    })
  })
}

export const addAndMoveToChannel = (name) => {
  return (dispatch) => {
    return createChannel(name)
      .then(({ channel }) => {
        dispatch({
          type: 'ADD_CHANNEL',
          channel
        })
        return dispatch(push(`/${name}`))
      })
  }
}
export const updateCurrentChannel = (channel) => {
  return push(`/${channel.name}`)
}
export const listenNewChannel = () => {
  return (dispatch) => {
    socket.on('new channel', ({ channel }) => {
      dispatch({
        type: 'ADD_CHANNEL',
        channel
      })
    })
  }
}
export const unlistenNewChannel = () => {
  socket.off('new channel')
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
