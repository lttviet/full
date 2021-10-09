import React from 'react'

const Person = ({ person }) => (
  <div key={person.id}>{person.name} {person.number}</div>
)

export default Person
