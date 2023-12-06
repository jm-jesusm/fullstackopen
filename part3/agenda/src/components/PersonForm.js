import React, { useState } from 'react'
import peopleService from '../services/people'
import NOTIFICACION_CODE_ENUM from '../notificationEnum'

const PersonForm = ({people, setPeople, setNotification}) => {
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
          setNotification({code: NOTIFICACION_CODE_ENUM.CORRECT, message: `Changed ${foundPerson.name}`})
        })
        .catch(() => setNotification({code: NOTIFICACION_CODE_ENUM.ERROR, message: `Information of ${foundPerson.name} couldn't be changed, try again later`}))
        .finally(() => setTimeout(() => setNotification({code: NOTIFICACION_CODE_ENUM.NONE, message: ''}), 3000))
    }

    const newPerson = {name : newName, number: newNumber}

    peopleService
      .create(newPerson)
      .then(person => {
        setPeople((prevPeople) => [...prevPeople, person])
        setNotification({code: NOTIFICACION_CODE_ENUM.CORRECT, message: `Added ${newPerson.name}`})
      })
      .catch(() => setNotification({code: NOTIFICACION_CODE_ENUM.ERROR, message: `Information of ${newPerson.name} couldn't be saved, try again later`}))
      .finally(() => setTimeout(() => setNotification({code: NOTIFICACION_CODE_ENUM.NONE, message: ''}), 3000))
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