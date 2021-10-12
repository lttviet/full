import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [toast, setToast] = useState({ success: true, message: '' })

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch(console.error)
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

  const showNotification = (success = true, message, ms = 5000) => {
    setToast({ success, message })
    setTimeout(() => setToast({ ...toast, message: '' }), ms)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      showNotification(false, 'Please fill out name and number')
      return
    }

    const found = persons.find((p) => p.name === newName)
    if (found) {
      // eslint-disable-next-line no-alert
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const newPerson = { ...found, number: newNumber }
        personService
          .update(found.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
            )

            showNotification(true, `Changed number for ${returnedPerson.name}`)
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.error(error.response.data)
            showNotification(false, error.response.data.error)
          })
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person))

          showNotification(true, `Added ${person.name}`)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          console.error(error.response.data)
          showNotification(false, error.response.data.error)
        })
    }
  }

  const deletePerson = (person) => {
    const { name, id } = person
    // eslint-disable-next-line no-alert
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))

          showNotification(true, `Deleted ${name}`)
        })
        .catch(() => showNotification(false, `${name} is not found`))
    }
  }

  const personsToShow = !searchName
    ? persons
    : persons.filter((person) => person.name
      .toLowerCase()
      .includes(searchName.toLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>

      <Notification success={toast.success} message={toast.message} />

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

      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </>
  )
}

export default App
