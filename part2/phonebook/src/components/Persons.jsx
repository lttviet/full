import PropTypes from 'prop-types'
import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleDelete }) => (
  <>
    {persons.map((person) => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </>
)

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })).isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Persons
