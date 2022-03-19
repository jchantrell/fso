import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const max = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(Array(max).fill(0))
  const current = anecdotes.indexOf(anecdotes[selected])
  const headers = [
    {
      text: 'anecdote of the day'
    },
    {
      text: 'anecdote with most votes'
    }
  ]

  return (
    <div>
      <Header data={headers[0]} />
      <div>{anecdotes[selected]}</div>
      <div> has {scores[selected]} votes</div>
      <Button handleClick={() => Vote(scores, setScores, current)} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * max))}text="another anecdote" />
      <Header data={headers[1]} />
      <Highest scores={scores} anecdotes={anecdotes} current={current} />
    </div>
  )
}

const Header = props => <h1>{props.data.text}</h1>

const Vote = (scores, setScores, current) => {
  const newScore = [...scores]
  newScore[current] += 1
  setScores(newScore)
}

const Highest = (props) => {
  let index = props.scores.indexOf(Math.max(...props.scores))
  let largest = props.scores[index]
  return (
    <div>
      <p>"{props.anecdotes[index]}"</p>
      <p> has the most votes, at {largest}</p>
    </div>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

export default App