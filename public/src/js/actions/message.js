export const postMessage = (currentChannel, username, text) => {
  return {
    type: 'POST_MESSAGE',
    currentChannel,
    username,
    text
  }
}
