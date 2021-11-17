const initialState = {
  id: 0,
  text: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        id: action.data.id,
        text: action.data.text,
      }
    case 'CLEAR_NOTIFICATION':
      if (action.data.id === state.id) {
        return initialState
      }
      return state
    default:
      return state
  }
}

const showNotification = (id, text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { id, text },
  }
}

const clearNotification = (id) => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: { id },
  }
}

let nextNotificationId = 0
export const setNotification = (dispatch, text) => {
  const id = nextNotificationId++

  dispatch(showNotification(id, text))

  setTimeout(() => {
    dispatch(clearNotification(id))
  }, 5000)
}

export default reducer
