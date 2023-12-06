import React from 'react'
import peopleService from '../services/people'

const People = ({people, filter, setPeople}) => {

	const filteredPeople = people.filter(({name}) => !filter || name.match(new RegExp(filter, 'i')))

	const handleClick = id => () => {
		peopleService
			.deleteById(id)
			.then(() => {
				setPeople(prevPeople => prevPeople.filter(person => person.id !== id))
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