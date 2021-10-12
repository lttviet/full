/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
require('dotenv').config()

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((error) => {
    console.error('Error connecting to Mongo DB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
