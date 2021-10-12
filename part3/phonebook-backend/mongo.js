const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Usage: node monjo.js [<password> <name> <number>]')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Missing number')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullStack:${password}@cluster0.m2txp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // only password provided
  // return all entries
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((p) => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
} else {
  // add new entry
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
