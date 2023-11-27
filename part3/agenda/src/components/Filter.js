import React from 'react'

const Filter = ({setFilter}) => {

  const handleChange = ({target}) => setFilter(target.value)

  return (
    <div>
      filter shown with: <input onChange={handleChange} name='filter'/>
    </div>
  )
}

export default Filter