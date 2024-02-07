const express = require('express')
const app = express()
const hostname = '127.0.0.1'
const port = 3001

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  new Promise((resolve, reject) => {
    const found = persons.find(person => {
      if (id === person.id) {
        resolve(person)
        return true
      }
      return false
    })
    if (!found) {
      reject(new Error('Person not found'))
    }
  })
    .then(person => response.json(person))
    .catch(error => response.status(404).end())
})

app.get('/info', (request, response) => {
  response.send(
    `<p>
      Phonebook has info of ${persons.length} people.
      <br/>
      <br/>
      ${new Date().toDateString()}
    </p>`);
});



app.listen(port, hostname, () => {
  console.log(`Server running on link http://${hostname}:${port}`)
})