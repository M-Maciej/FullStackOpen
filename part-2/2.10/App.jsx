import { useState } from 'react'
import { PersonDisplay, PersonFilter } from './components/PersonFilterAndDisplay'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newRegistration, setnewRegistration] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newRegistration.name.trim()).length > 0) {
      alert(`name: ${newRegistration.name.trim()} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newRegistration.name.trim(), number: newRegistration.number.trim(), id: persons.length + 1 }))
      setnewRegistration({ name: '', number: '' })
    }
  }

  const handleInputName = (event) => {
    setnewRegistration({ ...newRegistration, name: event.target.value })
  }
  const handleInputNumber = (event) => {
    setnewRegistration({ ...newRegistration, number: event.target.value })
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter persons={persons} handleSearch={handleSearch} search={search} />
      <h2>Add a name</h2>
      <PersonForm newRegistration={newRegistration} handleSubmit={handleSubmit} handleInputName={handleInputName} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      <PersonDisplay persons={persons} />

    </div>
  )
}

export default App