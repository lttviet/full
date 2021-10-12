import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({
  name, number, onSubmit, onNameChange, onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name:
      <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number:
      <input value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

PersonForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
}

export default PersonForm
