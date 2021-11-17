const initialState = "Hello World!"

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.msg
    default:
      return state
  }
}

export const notify = (msg) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: { msg },
  }
}

export default reducer
