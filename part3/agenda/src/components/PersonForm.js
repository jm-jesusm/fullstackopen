import React, { useState } from 'react'

const PersonForm = ({people, setPeople}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    if(people.some(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    setPeople((prevPeople) => [...prevPeople, {name : newName, phone: newNumber}])
  }

  const handleChange = (setFunction) => ({target}) => setFunction(target.value)

  return (
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
  )
}

export default PersonForm