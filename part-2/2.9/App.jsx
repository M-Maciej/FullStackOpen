import { useState } from 'react'

const NameAndNumber = ({ name, number }) => {
  return (
    <li>{`${name} ${number}`}</li>
  )
}
const Display = ({ persons }) => {
  return (
    <ul>
      {persons.map((registry) => <NameAndNumber key={registry.number} name={registry.name} number={registry.number} />)}
    </ul>
  )
}
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
    if (persons.filter(person => (person.name === newRegistration.name || person.number === newRegistration.number)).length > 0) {
      alert(`name: ${newRegistration.name}, or number: ${newRegistration.number} are already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ ...newRegistration, id: persons.lenth + 1 }))
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
  const nameSearch = (registry) => {
    const name = registry.name
    if (name.length < search.length) {
      return false
    }
    else {
      /*
      for (let i = 0; i < search.length; i++) {
        //console.log(name[i].toLowerCase())
        if (search[i].toLowerCase() !== name[i].toLowerCase()) {
          return false
        }
      }
      */
      for (const [i, char] of Array.from(search).entries()) {
        if (char.toLowerCase() !== name[i].toLowerCase()) {
          return false;
        }
      }

    }
    return true

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={search} onChange={handleSearch} />
        <Display persons={persons.filter(nameSearch)} />
      </div>
      <h2>Add a name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newRegistration.name} onChange={handleInputName} />
        </div>
        <div>
          number: <input value={newRegistration.number} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={persons} />

    </div>
  )
}

export default App