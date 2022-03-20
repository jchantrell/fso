import React from 'react'

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

export default Course