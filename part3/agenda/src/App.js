import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleSubmit = event => {
    setPersons([...persons, {name: event.target.name.value}])
    console.log(event.target.name.value)
    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='name'/>
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