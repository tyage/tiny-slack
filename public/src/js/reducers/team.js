const initState = {
  name: 'initial name'
}

const team = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}

export default team
