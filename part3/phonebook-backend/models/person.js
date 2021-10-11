require('dotenv').config()

const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URI)
  .then(() =>
    console.log('Connected to Mongo DB')
  )
  .catch((error) =>
    console.error('Error connecting to Mongo DB: ', error.message)
  )

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
