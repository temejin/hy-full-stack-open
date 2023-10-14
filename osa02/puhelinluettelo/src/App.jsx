import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({filter, handler}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handler} />
    </div>
  )
}

const NewPersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div> name: <input value={props.name} onChange={props.handleName} /> </div>
        <div> number: <input value={props.number} onChange={props.handleNumber} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
    </div>
  )
}

const Person = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.name} {props.number} <button onClick={props.remove}>delete</button>
      </p>
    </>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(p => <Person remove={() => props.remove(p)} id={p.id} name={p.name} number={p.number} />)}
    </div>
  )
}

const Notification = ({message}) => {
  console.log(message)
  if (!message) {
    return null
  }

  return (
    <div className="notification">{message}</div>
  )
}

const ErrorMessage = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className="errorMessage">{message}</div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => { 
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const newContact = { name: newName, number: newNumber}
    if (persons.map( p => p.name).includes(newContact.name)) {
      if (window.confirm(`${newContact.name} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName)
      const id = person.id
      const updatedPerson = {...person, number: newNumber}
      personService.update(id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNotification(`Changed ${returnedPerson.name}'s number`)
          setTimeout(() => {
            setNotification(null)
          },5000)
          setNewNumber('')
          setNewName('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })
        setNewNumber('')
      }
    } else {
      personService.create(newContact)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          },5000)
          setNewNumber('')
          setNewName('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null),5000)
        })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
        .then(_ => {
          personService.getAll()
            .then( remainingPersons => {
              setPersons(remainingPersons)
            })
        })
      setNotification(`Removed ${person.name}`)
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterNumbers = (number) => {
    return (number.name.toLowerCase().includes(newFilter.toLowerCase()) || number.number.includes(newFilter))
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <Filter filter={newFilter} handler={handleFilterChange}/>
      <h2>Add a new</h2>
      <NewPersonForm onSubmit={addContact} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons remove={removePerson} persons={persons.filter(filterNumbers)} />
    </div>
  )
}

export default App
