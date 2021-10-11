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

app.get('/info', (req, res, next) => {
  Person.countDocuments()
    .then(total => {
      res.send(
        `Phonebook has info for ${total} people<br>${new Date()}`
      )
    })
    .catch(next)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(ret => {
    res.json(ret)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(p => {
      p ? res.json(p) : res.status(404).end()
    })
    .catch(next)
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

app.put('/api/persons/:id', (req, res, next) => {
  const person = req.body

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next)
})

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'Not found' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
