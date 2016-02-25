import { push } from 'react-router-redux'

let nextId = 0
const createChannel = (name) => {
  return {
    id: (++nextId).toString(),
    name
  }
}

export const addAndMoveToChannel = (name) => {
  return (dispatch, getState) => {
    const channel = createChannel(name)
    dispatch({
      type: 'ADD_CHANNEL',
      ...channel
    })
    return dispatch(push(`/${channel.id}`))
  }
}
export const updateCurrentChannel = (channel) => {
  return push(`/${channel.id}`)
}
