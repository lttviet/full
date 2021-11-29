import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../redux/alertSlice'

const successStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const errorStyle = {
  ...successStyle,
  color: 'red',
}

const Notification = () => {
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (alert.message !== '') {
      setShow(true)

      const timerId = setTimeout(() => {
        dispatch(reset())
        setShow(false)
      }, 5000)

      return () => clearTimeout(timerId)
    }

    return null
  }, [alert])

  if (!show) return null

  return (
    <div
      style={alert.type === 'success' ? successStyle : errorStyle}
      data-cy="notification"
    >
      {alert.message}
    </div>
  )
}

export default Notification
