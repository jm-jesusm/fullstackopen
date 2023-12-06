import React, { useState } from 'react'
import peopleService from '../services/people'

const PersonForm = ({people, setPeople}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    if(people.some(person => person.name === newName)) {
      if(!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        return false

      const [foundPerson] = people.filter(person => person.name === newName)

      return peopleService
        .update({...foundPerson, number: newNumber})
        .then(person => {
          setPeople((prevPeople) => prevPeople.map(prevPerson => prevPerson.id === person.id ? person : prevPerson))
        })
    }

    const newPerson = {name : newName, number: newNumber}

    peopleService
      .create(newPerson)
      .then(person => {
        setPeople((prevPeople) => [...prevPeople, person])
      })
    
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