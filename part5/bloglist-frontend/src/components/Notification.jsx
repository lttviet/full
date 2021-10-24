import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ success = true, message }) => {
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

  return (
    <>
      {message && (
        <div style={success ? successStyle : errorStyle}>
          {message}
        </div>
      )}
    </>
  )
}

Notification.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string.isRequired,
}

Notification.defaultProps = {
  success: true,
}

export default Notification
