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