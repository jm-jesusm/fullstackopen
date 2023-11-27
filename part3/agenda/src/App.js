import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleSubmit = event => {
    event.preventDefault()

    if(persons.some(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, {name : newName}])
  }

  const handleChangeName = ({target}) => setNewName(target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChangeName} name='name'/>
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