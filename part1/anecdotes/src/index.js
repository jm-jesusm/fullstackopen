import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({})

  useEffect(() => {
    const highestVote = Math.max(...votes);
    const highestVoteIndex = votes.indexOf(highestVote)
    const anecdote = props.anecdotes[highestVoteIndex]
    setMostVoted({anecdote, votes: highestVote})
  }, [votes])

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(randomNumber)
  } 

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{mostVoted.anecdote}</p>
        <p>has {mostVoted.votes} votes</p>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = createRoot(document.getElementById('root'));
root.render(<App anecdotes={anecdotes} />);
