const express = require('express')
const app = express()
app.use(express.json())

let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (_request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)
  if(!person) return response.status(404).end()
  response.json(person)
})

app.post('/api/persons/', (request, response) => {
  const id = Math.floor(Math.random()*10000)

  const person = request.body
  if(!person.name && !person.number) return response.status(204).json({ error: 'name and number are required' })
  if(!person.name) return response.status(206).json({ error: 'name is required' })
  if(!person.number) return response.status(206).json({ error: 'number is required' })
  
  const isRegistered = phonebook.some(({name}) => name === person.name)
  if(isRegistered) return response.status(302).json({ error: 'name must be unique' })

  person.id = id

  phonebook = phonebook.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/info', (_request, response) => {
  response.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})