import { useState } from 'react'

const Filter = ({filter, handler}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handler} />
    </div>
  )
}

const NewPersonForm = (props) => {
  console.log(props)
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div> name: <input value={props.nme} onChange={props.handleName} /> </div>
        <div> number: <input value={props.number} onChange={props.handleNumber} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
    </div>
  )
}

const Person = ({name,number}) => {
  return (
    <>
      <p>{name} {number}</p>
    </>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(p => <Person id={p.id} name={p.name} number={p.number} />)}
    </div>
  )
}


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const addContact = (event) => {
    event.preventDefault()
    console.log('nappula',event.target)
    const newContact = { id: persons.length + 1, name: newName, number: newNumber}
    if (persons.map( p => p.name).includes(newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newContact))
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
    console.log(number)
    console.log(newFilter)
    return (number.name.toLowerCase().includes(newFilter.toLowerCase()) || number.number.includes(newFilter))
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange}/>
      <h2>Add a new</h2>
      <NewPersonForm onSubmit={addContact} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(filterNumbers)} />
    </div>
  )
}

export default App
