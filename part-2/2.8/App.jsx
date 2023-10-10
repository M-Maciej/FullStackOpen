import { useState } from 'react'

const NameAndNumber = ({ name, number }) => {
  return (
    <li>{`${name} ${number}`}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 232232323 }
  ])
  const [newRegistration, setnewRegistration] = useState({ name: '', number: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(person => (person.name === newRegistration.name || person.number === newRegistration.number)).length > 0) {
      alert(`name: ${newRegistration.name}, or number: ${newRegistration.number} are already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newRegistration))
      setnewRegistration({ name: '', number: '' })
    }

  }
  const handleInputName = (event) => {
    setnewRegistration({ ...newRegistration, name: event.target.value })
  }
  const handleInputNumber = (event) => {
    setnewRegistration({ ...newRegistration, number: event.target.value })
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <ul>
        {persons.map((registry) => <NameAndNumber key={registry.number} name={registry.name} number={registry.number} />)}
      </ul>

    </div>
  )
}

export default App