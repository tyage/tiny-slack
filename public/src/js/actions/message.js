import socket from '../lib/socket'

const createMessage = (channel, username, text) => {
  return new Promise((resolve, reject) => {
    socket.emit('create message', {
      channelId: channel.name,
      username,
      text
    })

    socket.once('create message result', (response) => {
      if (response.result === 'success') {
        resolve(response)
      } else {
        reject(response.message)
      }
    })
  })
}
const fetchMessages = (channel) => {
  return new Promise((resolve, reject) => {
    socket.emit('get messages', { channelId: channel.name })

    socket.once('messages', (response) => {
      resolve(response)
    })
  })
}

export const postMessage = (channel, username, text) => {
  localStorage.setItem('defaultUsername', username)

  return (dispatch) => {
    createMessage(channel, username, text)
      .then(({ message }) => {
        dispatch({
          type: 'ADD_MESSAGE',
          message
        })
      })
  }
}
export const listenNewMessage = (channel) => {
  return (dispatch) => {
    socket.on('new message', ({ message }) => {
      if (message.channelId === channel.name) {
        dispatch({
          type: 'ADD_MESSAGE',
          message
        })
      }
    })
  }
}
export const unlistenNewMessage = () => {
  socket.off('new message')
}
export const updateMessages = (channel) => {
  return (dispatch) => {
    return fetchMessages(channel)
      .then(({ messages }) => {
        return dispatch({
          type: 'UPDATE_MESSAGES',
          messages
        })
      })
  }
}
