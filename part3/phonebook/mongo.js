const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://phonebook-mongoose:${password}@fullstack-open.xegqvhc.mongodb.net/fullstack-open-part-3?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
}, {
  timestamps: true,
  versionKey: false
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length) {
  case 3: {
    const people = Person.find({})
    console.log('phonebook: ')
    people.then(res => {
      res.forEach(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
    break
  }
  case 5: {
    const [name, number] = process.argv.slice(3)
    const person = new Person({
      name,
      number
    })
    person.save().then(res => {
      console.log(`added ${res.name} number ${res.number} to phonebook`)
      mongoose.connection.close()
    })
    break
  }
  default: {
    console.log(console.log('Wrong number of arguments, follow this template: \nnode mongo.js <password> \nor \nnode mongo.js <password> <name> <number>'))
    mongoose.connection.close()
    break
  }
}
