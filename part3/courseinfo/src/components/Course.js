import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({course: {name, parts}}) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
    </div>
  )
}

export default Course