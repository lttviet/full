import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      alert(`Please fill out name and number.`)
      return
    }

    const alreadyAdded = persons.some(person => person.name === newName)
    if (alreadyAdded) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(
        { name: newName, number: newNumber, id: persons.length + 1 }
      ))

      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = !searchName
    ? persons
    : persons.filter(person =>
      person.name
        .toLowerCase()
        .includes(searchName.toLowerCase())
    )

  return (
    <>
      <h2>Phonebook</h2>

      <Filter value={searchName} onChange={handleSearchNameChange} />

      <h2>add a new</h2>

      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </>
  )
}

export default App
