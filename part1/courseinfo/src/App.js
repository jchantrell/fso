const App = () => {
  const course = [
    {
      name: 'Half Stack application development'
    },
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course[0].name} </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
      <Part part={props.parts[3]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {
      props.parts[1].exercises + 
      props.parts[2].exercises + 
      props.parts[3].exercises}</p>
  )  
}   

export default App