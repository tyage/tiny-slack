import fetch from 'isomorphic-fetch'

const createMessage = (channel, username, text) => {
  return fetch(`/api/messages/${channel.name}/new`, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        text
      })
    })
    .then(res => res.json())
}
const fetchMessages = (channel) => {
  return fetch(`/api/messages/${channel.name}`)
    .then(res => res.json())
}

export const postMessage = (channel, username, text) => {
  localStorage.setItem('defaultUsername', username)

  return (dispatch) => {
    return createMessage(channel, username, text)
      .then(({ message }) => {
        return dispatch({
          type: 'ADD_MESSAGE',
          message
        })
      })
  }
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
