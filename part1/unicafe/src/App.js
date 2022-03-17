import { useState } from 'react'

const App = () => {

  const ratings = [
    
  ]

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <DisplayStats data/>
    </div>
  )
}

const Display = (props) => (
  <div>{props.value}</div>
  )

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )

const Header = props => <h1>{props.data.text}</h1>

const DisplayStats = (props) => {
  console.log(props)
  return (
    <div>

    </div>
  )
}

export default App