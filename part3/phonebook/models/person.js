const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 3, 
    unique: true 
  },
  number: { 
    type: String, 
    required: true, 
    minlength: 8 
  }
}, {
  timestamps: true,
  versionKey: false
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.createdAt
    delete returnedObject.updatedAt
  }
})

module.exports = mongoose.model('Person', personSchema)