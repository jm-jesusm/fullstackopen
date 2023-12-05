import React, { useEffect, useState } from 'react'
import peopleService from './services/people'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'

const App = () => {
  const [ people, setPeople ] = useState([])

  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(people => {
        setPeople(people)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm people={people} setPeople={setPeople} />
      
      <h2>Numbers</h2>
      
      <People people={people} filter={filter} />
    </div>
  )
}

export default App