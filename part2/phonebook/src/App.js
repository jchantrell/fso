import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (PersonExists(persons, personObject.name) === true){
      alert(`${personObject.name} already exists.`)
    }
    else
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add new</h2>
      <PersonForm 
      addPerson={addPerson} 
      persons={persons} 
      newName={newName} 
      newNumber={newNumber} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>      
      filter <input 
      value={props.filter} 
      onChange={props.handleFilter} />
    </div>
  )
}

const PersonExists = (persons, newName) => {
  return persons.some(function(person) {
    return person.name === newName
  })
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} - {person.number}</li>
  )
}

export default App