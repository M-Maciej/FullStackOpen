import { useState } from 'react'

const Number = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(number => number.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName }))
      setNewName('')
    }

  }
  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((number) => <Number key={number.name} name={number.name} />)}
      </ul>

    </div>
  )
}

export default App