import React, { useEffect, useState } from 'react'
import peopleService from './services/people'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'
import NOTIFICACION_CODE_ENUM from './notificationEnum'
import './index.css'

const App = () => {
  const [ people, setPeople ] = useState([])

  const [ filter, setFilter ] = useState('')

  const [ notification, setNotification ] = useState({code: NOTIFICACION_CODE_ENUM.NONE, message: ''})


  useEffect(() => {
    peopleService
      .getAll()
      .then(people => {
        setPeople(people)
      })
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm people={people} setPeople={setPeople} setNotification={setNotification} />
      
      <h2>Numbers</h2>
      
      <People people={people} filter={filter} setPeople={setPeople} setNotification={setNotification} />
    </div>
  )
}

export default App