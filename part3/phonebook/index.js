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

app.get('/api/persons', (_request, response) => {
  Person.find({})
    .then(res => {
      response.json(res)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.post('*', morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons/', (request, response) => {

  const {name, number} = request.body
  if(!name && !number) return response.status(204).json({ error: 'name and number are required' })
  if(!name) return response.status(206).json({ error: 'name is required' })
  if(!number) return response.status(206).json({ error: 'number is required' })
  
  const person = new Person({name, number})
  person.save()
    .then(res => {
      response.status(201).json(res)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(_res => {
      response.status(204).end()
    })

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})