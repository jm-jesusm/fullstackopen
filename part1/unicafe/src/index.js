import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stadistics = ({good, bad, neutral}) => {

  const total = good+neutral+bad

  return (
    
      <div>
        <h1>stadistics</h1>
        {
          (good === 0 && bad === 0 && neutral === 0) ?
            <p>No feedback given</p>
          :
            <>
              <StadisticLine text="good" value={good} />
              <StadisticLine text="neutral" value={neutral} />
              <StadisticLine text="bad" value={bad} />
              <StadisticLine text="all" value={total} />
              <StadisticLine text="average" value={(good-bad)/total} />
              <StadisticLine text="positive" value={`${good/total*100} %`} />
            </>
        }
      </div>
  )
}

const StadisticLine = ({text, value}) => <p>{text} {value}</p>


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
      <Stadistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
