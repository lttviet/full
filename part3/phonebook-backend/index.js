const express = require('express')

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => {
  let id = NaN
  do {
    id = Math.floor(Math.random() * 100000) + 1
  } while (persons.find(p => p.id === id))

  return id
}

const app = express()

app.use(express.json())

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} people<br>${new Date()}`

  res.send(info)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) {
    return res.status(400).json({
      error: 'Missing name'
    })
  }

  if (!number) {
    return res.status(400).json({
      error: 'Missing number'
    })
  }

  if (persons.find(p => p.name === name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name,
    number,
    id: generateId()
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
