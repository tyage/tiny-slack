const currentChannel = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_CHANNEL':
      return action.channel
    default:
      return state
  }
}

export default currentChannel
