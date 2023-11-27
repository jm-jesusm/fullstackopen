import React from 'react'

const People = ({people}) => {

	const filteredPeople = people.filter(({name}) => !filter || name.match(new RegExp(filter, 'i')))

  return (
    <div>
			{filteredPeople.map(({name, number}) => (
				<p key={name}>{name} {number}</p>)
			)}
		</div>
  )
}

export default People