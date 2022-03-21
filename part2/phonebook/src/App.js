import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      id: persons.length + 1,
    }

    if (PersonExists(persons, personObject.name) === true){
      alert(`${personObject.name} already exists.`)
    }
    else
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newPerson}
          onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const PersonExists = (persons, newName) => {
  return persons.some(function(person) {
    return person.name === newName
  })
}

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

export default App