import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ text }) => {
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

const mapStateToProps = (state) => {
  return {
    text: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
