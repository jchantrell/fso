const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

const Course = (props) => <>{props.courses.map(course => 
<Content course={course} key={course.id}/>)}</>

const Content = (props) => {
  return (
    <div>
      <Header text={props.course.name} /> 
      {props.course.parts.map(part => 
      <Part part={part} key={part.id}/>)}
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = props => <h1>{props.text}</h1>

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}));

  return (
    <p style={{fontWeight: "bold"}}> total of {total.exercises} exercises</p>
  )  
}     

export default App