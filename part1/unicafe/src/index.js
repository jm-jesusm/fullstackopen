import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stadistics = ({good, bad, neutral}) => {

  const total = good+neutral+bad

  return (
    <div>
      <h1>stadistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good-bad)/total || 0}</p>
      <p>positive {good/total*100 || 0}%</p>
    </div>
  )
}

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
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <Stadistics good={good} neutral={neutral} bad={good}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
