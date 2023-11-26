import React from 'react'

const Total = ({parts}) => {

  let total = 0

  parts.forEach(({exercises}) => {
    total+=exercises
  });
  
  return (
    <strong>total of exercises {total}</strong>
  )
}

export default Total