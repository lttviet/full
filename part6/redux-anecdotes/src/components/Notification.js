import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const text = useSelector((state) => state.notification.text)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!text) {
    return null
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification
