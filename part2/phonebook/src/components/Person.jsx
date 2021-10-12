import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ person, handleDelete }) => (
  <div key={person.id}>
    {person.name}
    {' '}
    {person.number}
    <button type="button" onClick={() => handleDelete(person)}>delete</button>
  </div>
)

Person.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Person
