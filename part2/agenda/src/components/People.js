import React from 'react'
import peopleService from '../services/people'
import NOTIFICACION_CODE_ENUM from '../notificationEnum'

const People = ({people, filter, setPeople, setNotification}) => {

	const filteredPeople = people.filter(({name}) => !filter || name.match(new RegExp(filter, 'i')))

	const handleClick = id => () => {
		const [foundPerson] = people.filter(person => person.id === id)
		if(!window.confirm(`Delete ${foundPerson.name}?`))
			return false
		peopleService
			.deleteById(id)
			.then(() => setNotification({code: NOTIFICACION_CODE_ENUM.CORRECT, message: `Deleted ${foundPerson.name}`}))
			.catch(() => setNotification({code: NOTIFICACION_CODE_ENUM.ERROR, message: `Information of ${foundPerson.name} has already been deleted from the server`}))
			.finally(() => {
				setPeople(prevPeople => prevPeople.filter(person => person.id !== id))
				setTimeout(() => setNotification({code: NOTIFICACION_CODE_ENUM.NONE, message: ''}), 3000)
			})
	}

  return (
    <div>
			{filteredPeople.map(({name, number, id}) => 
				(
					<div key={name}>
						<span>{name} {number} </span>
						<button onClick={handleClick(id)}>delete</button>
					</div>
				)
			)}
		</div>
  )
}

export default People