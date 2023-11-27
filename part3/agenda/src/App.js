import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  
  const handleSubmit = event => {
    event.preventDefault()

    if(persons.some(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, {name : newName, phone: newNumber}])
  }

  const handleChange = (setFunction) => ({target}) => setFunction(target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with: <input onChange={handleChange(setNameFilter)} name=''/>
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange(setNewName)} name='name'/>
        </div>
        <div>
          number: <input onChange={handleChange(setNewNumber)} name='number'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {persons
          .filter(({name}) => !nameFilter || name.match(new RegExp(nameFilter, 'i')))
          .map(({name, number}) => <p key={name}>{name} {number}</p>)
        }
      </div>
    </div>
  )
}

export default App