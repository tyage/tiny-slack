let nextId = 0

export const postMessage = (currentChannel, username, text) => {
  return {
    type: 'POST_MESSAGE',
    id: ++nextId,
    currentChannel,
    username,
    text,
    createdAt: new Date()
  }
}
