import React from 'react'

const Total = ({parts}) => {

  const total = parts.reduce((buffer, {exercises: current}) => buffer+current, 0)
  
  return (
    <strong>total of exercises {total}</strong>
  )
}

export default Total