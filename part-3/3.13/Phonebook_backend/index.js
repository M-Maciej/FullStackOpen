require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const personService = require('./models/personService')
const cors = require('cors')
const app = express()
const hostname = '0.0.0.0'
const port = process.env.PORT || 6786

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

const generateId = () => {
  return Math.floor(Math.random() * 10 ** 10)
}

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' && req.body.name && req.body.number
      ? `${JSON.stringify({ name: req.body.name, number: req.body.number })}`
      : '-'
  ].join(' ')
}))


//HTTP requests
//Post
app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'content missing' })
  }
  const unique = persons.find(person => person.name === request.body.name)
  if (unique) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  const person = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number
  }
  persons = persons.concat(person)
  console.log(person)
  response.json(person)

})

//Gets
app.get('/api/persons', (request, response) => {
  personService.fetchAll()
    .then(persons => {
      response.json(persons)
    })
    .catch(error => response.status(404).end())
})

app.get('/api/persons/:id', (request, response, next) => {
  personService.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => response.status(404).end())
})


app.get('/info', (request, response) => {
  personService.length()
    .then(count => {
      response.send(
        `<p>Phonebook has info of ${count} people.</p>
        <br/>
        <br/>
        ${new Date().toDateString()}`
      );
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('<p>Error fetching information</p>');
    });
});
//Delete
app.delete('/api/persons/:id', (request, response) => {
  new Promise((resolve, reject) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    resolve()
  })
    .then(___ => response.status(204).end())
    .catch(error => response.status(404).end())
})
app.get('/favicon.ico', (req, res) => res.status(204).end());
//Unkown and listening

const unkowonEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unkowonEndpoint)
app.listen(port, hostname, () => {
  console.log(`Server running on link http://${hostname}:${port}`)
})