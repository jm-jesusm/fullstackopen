import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Stadistics = ({good, bad, neutral}) => {

  const total = good+neutral+bad

  return (
    
      <div>
        <h1>stadistics</h1>
        {
          (good === 0 && bad === 0 && neutral === 0) ?
            <p>No feedback given</p>
          :
            <table>
              <tbody>
                <StadisticLine text="good" value={good} />
                <StadisticLine text="neutral" value={neutral} />
                <StadisticLine text="bad" value={bad} />
                <StadisticLine text="all" value={total} />
                <StadisticLine text="average" value={(good-bad)/total} />
                <StadisticLine text="positive" value={`${good/total*100} %`} />
              </tbody>
            </table>
        }
      </div>
  )
}

const StadisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td> 
  </tr>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGood} text={'good'}/>
        <Button handleClick={handleNeutral} text={'neutral'}/>
        <Button handleClick={handleBad} text={'bad'}/>
      </div>
      <Stadistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
