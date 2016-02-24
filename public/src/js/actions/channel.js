export const addChannel = (name) => {
  return {
    type: 'ADD_CHANNEL',
    name
  }
}
export const updateCurrentChannel = (channel) => {
  return {
    type: 'UPDATE_CURRENT_CHANNEL',
    channel
  }
}
