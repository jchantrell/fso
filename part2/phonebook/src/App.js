import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [foundPersons, setFoundPersons] = useState(persons)

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
    const keyword = event.target.value;

    if (keyword !== '') {
      const results = persons.filter((person) => {
        return person.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundPersons(results);
    } else {
      setFoundPersons(persons);
    }
    setFilter(keyword);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>      
        filter <input 
        value={filter} 
        onChange={handleFilter} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={foundPersons} />
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