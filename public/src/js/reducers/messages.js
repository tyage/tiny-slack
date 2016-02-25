const messages = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return action.messages
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}

export default messages
