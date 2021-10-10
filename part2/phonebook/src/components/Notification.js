import React from 'react'

const Notification = ({ success = true, message }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    ...successStyle,
    color: 'red'
  }

  return (
    <>
      {message && (
        <div style={success ? successStyle : errorStyle}>
          {message}
        </div >
      )}
    </>
  )
}

export default Notification
