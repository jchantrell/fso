import { useState, useEffect } from 'react'
import personsService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (PersonExists(persons, personObject.name) === true){
      alert(`${personObject.name} already exists.`)
    }
    else
    
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    const copy = [...persons]
    const person = persons.find(p => p.id === id)
    const toRemove = persons.indexOf(person)

    if (window.confirm(`Do you want to remove ${person.name} from the phonebook?`)){
      personsService
        .remove(id)
        .then(copy.splice(toRemove, 1))
        .then(setPersons(copy))
        .catch(error => {
          alert(
            `${person.name} was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
        })

    }
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
      <Persons persons={filteredPersons} remove={removePerson}/>
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
        <Person key={person.name} person={person} remove={props.remove}/>
      )}
    </ul>
  )
}

const Person = (props) => {
  return (
    <div>
      <li>{props.person.name} - {props.person.number} <Button handleClick={() => props.remove(props.person.id)}
      text="remove" /></li>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App