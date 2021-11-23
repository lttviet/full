const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.text
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const showNotification = (text) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { text },
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

let notificationId

export const setNotification = (text, second) => {
  return async (dispatch) => {
    console.log(notificationId)
    clearTimeout(notificationId)

    dispatch(showNotification(text))

    notificationId = setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}

export default reducer
