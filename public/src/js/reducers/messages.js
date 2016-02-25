let nextMessageId = 0

const channelMessages = (state = [], action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return [
        ...state,
        {
          id: ++nextMessageId,
          username: action.username,
          text: action.text,
          createdAt: new Date()
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
