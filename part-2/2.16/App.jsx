import { useState, useEffect, useRef } from 'react'
import { PersonDisplay, PersonFilter } from './components/PersonFilterAndDisplay'
import PersonForm from './components/PersonForm'
import phonebookServices from './services/phonebookServices'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newRegistration, setnewRegistration] = useState({ name: '', number: '' })
  const [search, setSearch] = useState('')
  const [notify, setNotify] = useState(null)
  const stateRef = useRef(notify);

  useEffect(() => {
    phonebookServices
      .getAll()
      .then(resData => {
        setPersons(resData)
      })
  }, [])
  const handleNotify = (message) => {
    stateRef.current = message
    Promise.resolve(setNotify(message))
      .then(() =>
        setTimeout(() => {
          if (stateRef.current === message) {
            setNotify(null)
          }
        }
          , 5000)
      )
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const theRegistration = {
      name: newRegistration.name.trim(),
      number: newRegistration.number.trim()
    }
    if (persons.filter(person => person.name === theRegistration.name).length > 0) {
      if (confirm(`name: ${theRegistration.name} has been already added to phonebook.\nWould you like to update to a new number?`)) {
        phonebookServices
          .update(persons.find(per => per.name === theRegistration.name).id, theRegistration)
          .then(resData => {
            setPersons(persons.map(n => n.name !== theRegistration.name ? n : resData))
            setnewRegistration({ name: '', number: '' })
          })
          .then(() =>
            Promise.resolve(handleNotify(`Changed number for ${theRegistration.name} to ${theRegistration.number}`))
          )
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
        .then(() =>
          Promise.resolve(handleNotify(`Added ${theRegistration.name}`))
        )
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
      .then(() =>
        Promise.resolve(handleNotify(`Deleted ${persons.find(per => per.id === id).name}`))
      )
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
      <Notification msg={notify} />
      <PersonFilter persons={persons} handleSearch={handleSearch} search={search} handleDelete={handleDelete} />
      <h2>Add a name</h2>
      <PersonForm newRegistration={newRegistration} handleSubmit={handleSubmit} handleInputName={handleInputName} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      <PersonDisplay persons={persons} handleDelete={handleDelete} />

    </div>
  )
}

export default App