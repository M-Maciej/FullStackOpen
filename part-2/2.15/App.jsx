import { useState, useEffect } from 'react'
import { PersonDisplay, PersonFilter } from './components/PersonFilterAndDisplay'
import PersonForm from './components/PersonForm'
import phonebookServices from './services/phonebookServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newRegistration, setnewRegistration] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(resData => {
        setPersons(resData)
      })
  }, [])


  const handleSubmit = (event) => {

    const theRegistration = {
      name: newRegistration.name.trim(),
      number: newRegistration.number.trim()
    }
    event.preventDefault()
    if (persons.filter(person => person.name === theRegistration.name).length > 0) {
      if (confirm(`name: ${theRegistration.name} has been already added to phonebook.\nWould you like to update to a new number?`)) {
        phonebookServices
          .update(persons.find(per => per.name === theRegistration.name).id, theRegistration)
          .then(resData => {
            setPersons(persons.map(n => n.name !== theRegistration.name ? n : resData))
            setnewRegistration({ name: '', number: '' })
          })
          .catch(error => {
            console.log('fail')
            console.log(error)
          })
      }
    }
    else {
      phonebookServices
        .add(theRegistration)
        .then(resData => {
          setPersons(persons.concat(resData))
          setnewRegistration({ name: '', number: '' })
        })
        .catch(error => {
          console.log('fail')
          console.log(error)
        })
      /*
      setPersons(persons.concat({ name: newRegistration.name.trim(), number: newRegistration.number.trim(), id: persons.length + 1 }))
      setnewRegistration({ name: '', number: '' })
      */
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
  const handleDelete = (id) => {
    phonebookServices
      .del(id)
      .then(reposnse => {
        console.log(reposnse)
        setPersons(persons.filter(per => per.id !== id))
      })
      .catch(() => {
        console.log(`Person has been already deleted`)
        phonebookServices
          .getAll()
          .then(resData => setPersons(resData))

      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter persons={persons} handleSearch={handleSearch} search={search} handleDelete={handleDelete} />
      <h2>Add a name</h2>
      <PersonForm newRegistration={newRegistration} handleSubmit={handleSubmit} handleInputName={handleInputName} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      <PersonDisplay persons={persons} handleDelete={handleDelete} />

    </div>
  )
}

export default App