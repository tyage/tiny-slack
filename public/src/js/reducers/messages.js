const channelMessages = (state = [], action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return [
        ...state,
        {
          username: action.username,
          text: action.text
        }
      ]
    default:
      return state
  }
}

const messages = (state = {}, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      const channelId = action.currentChannel.id
      return Object.assign({}, state, {
        [channelId]: channelMessages(state[channelId], action)
      })
    default:
      return state
  }
}

export default messages
