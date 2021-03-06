import { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [notification, setNotification] = useState(null)
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

  const addPerson = async (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (PersonNameExists(persons, personObject.name) === true){
      const person = persons.find(p => p.name === personObject.name)
      if (person.number !== personObject.number){
        const updatedPersons = [...persons]
        const toUpdate = persons.indexOf(person)

        if (window.confirm(`Do you want to update ${personObject.name}'s number to ${personObject.number}?`)){
          
          personsService
            .update(person.id, personObject)
          

            .catch(error => {
              setNotification(
                error.response.data.error
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)})

              
              updatedPersons[toUpdate].number = personObject.number
              setPersons(updatedPersons)
              setNewName('')
              setNewNumber('')
              setNotification(
                `Updated ${personObject.name}'s number to ${personObject.number}`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
              
        }
      }
      else alert(`${personObject.name} is already in the phonebook.`)
    }

    else   
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(
          `${personObject.name} has been added to the phonebook.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })

      .catch(error => {
        setNotification(
          error.response.data.error
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)

      })
  }

  const removePerson = (id) => {
    const updatedPersons = [...persons]
    const person = persons.find(p => p.id === id)
    const toRemove = persons.indexOf(person)

    if (window.confirm(`Do you want to remove ${person.name} from the phonebook?`)){
      personsService
        .remove(id)
        .then(updatedPerson => {
          updatedPersons.splice(toRemove, 1)
          setPersons(updatedPersons)
          setPersons(persons.filter(p => p.id !== id))
          setNotification(
            `${person.name} has been removed from the phonebook.`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })   

        .catch(error => {
          setNotification(
            error.response.data.error
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)              
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
      <Notification message={notification} />
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

const PersonNameExists = (persons, newName) => {
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

const Notification = (props) => {

  if (props.message === null){
    return null
  }

  if (props.message.includes("failed", "already")){
    return (
      <div className="notification" style={{color: "red"}}>{props.message}</div>
    )
  }

  else return <div className="notification" style={{color: "green"}}>{props.message}</div>
}

export default App