let nextChannelId = 0

const createNewChannel = (name) => {
  return {
    id: ++nextChannelId,
    name
  }
}

const channels = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
        ...state,
        createNewChannel(action.name)
      ]
    default:
      return state
  }
}

export default channels
