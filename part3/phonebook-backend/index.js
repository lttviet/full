require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => {
  const info =
    `Phonebook has info for ${persons.length} people<br>${new Date()}`

  res.send(info)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(ret => {
    res.json(ret)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(p => {
      if (p) {
        res.json(p)
      } else {
        res.status(404).end()
      }
    })
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

  const person = new Person({ name, number })
  person.save().then(ret => res.json(ret))
})

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'Not found' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
