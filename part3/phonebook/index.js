const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
morgan.token('body', function (req, _res) { return JSON.stringify(req.body) })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny', {
  skip: (req) => req.method === 'POST'
}))

const Person = require('./models/person')

app.get('/api/persons', (_request, response, next) => {
  Person.find({})
    .then(res => {
      response.json(res)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(err => next(err))
})

app.post('*', morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons/', (request, response, next) => {

  const {name, number} = request.body
  if(!name && !number) return response.status(204).json({ error: 'name and number are required' })
  if(!name) return response.status(206).json({ error: 'name is required' })
  if(!number) return response.status(206).json({ error: 'number is required' })
  
  const person = new Person({name, number})
  person.save()
    .then(res => {
      response.status(201).json(res)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(_res => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.get('/info', (_request, response) => {
  Person.find({})
    .then(res => {
      response.send(`
        <p>Phonebook has info for ${res.length} people</p>
        <p>${new Date()}</p>
      `)
    })
  
})

const errorHandler = (error, _request, response, next) => {
  switch(error.name) {
    case 'CastError': return response.status(400).json({ error: 'malformatted id' })
    default: return response.status(400).json({ error })
  }
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})