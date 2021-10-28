import PropTypes from 'prop-types'
import React, { useImperativeHandle, useState } from 'react'

const Toggle = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => (
    { toggleVisible }
  ))

  if (!visible) {
    return (
      <div>
        <button type="button" onClick={toggleVisible}>
          {buttonLabel}
        </button>
      </div>
    )
  }

  return (
    <div>
      {children}
      <button type="button" onClick={toggleVisible}>
        cancel
      </button>
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Toggle
