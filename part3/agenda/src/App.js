import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
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
        {persons.map(({name}) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default App