import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
  const handleChange = (event) => {
    const filter = event.target.value
    setFilter(filter)
  }

  return (
    <div>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default connect(null, { setFilter })(Filter)
