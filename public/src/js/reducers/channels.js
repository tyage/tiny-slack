const createNewChannel = (id, name) => {
  return {
    id,
    name
  }
}

const channels = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
        ...state,
        createNewChannel(action.id, action.name)
      ]
    default:
      return state
  }
}

export default channels
