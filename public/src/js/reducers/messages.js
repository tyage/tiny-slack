const channelMessages = (state = [], action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          text: action.text,
          createdAt: action.createdAt
        }
      ]
    default:
      return state
  }
}

const messages = (state = {}, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      if (action.currentChannel && action.username && action.text) {
        const channelId = action.currentChannel.id
        return Object.assign({}, state, {
          [channelId]: channelMessages(state[channelId], action)
        })
      }
      return state
    default:
      return state
  }
}

export default messages
