import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const percent = (good / all) * 100

  const headers = [
    {
      text: 'give feedback'
    },
    {
      text: 'statistics'
    }
  ]

  return (
    <div>
      <Header data={headers[0]} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header data={headers[1]} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percent={percent}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Header = props => <h1>{props.data.text}</h1>

const Statistics = (props) => {
  if (props.all === 0){
    return (
    <div>
      <p>leave some feedback</p>
    </div>
    )
  }

  else return (
  <div>
    <Stat text="good" value={props.good} /> 
    <Stat text="neutral" value={props.neutral} />
    <Stat text="bad" value={props.bad} />
    <Stat text="all" value={props.all} />
    <Stat text="average" value={props.average} />
    <Stat text="percent" value={props.percent} />
  </div>
  )

}

const Stat = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )

}

export default App