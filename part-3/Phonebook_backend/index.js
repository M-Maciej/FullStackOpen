require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const personService = require('./models/personService')
const cors = require('cors')
const { ValidationError, NotFoundError, DatabaseError, IdError } = require('./models/customErrors');
const app = express()
const hostname = '0.0.0.0'
const port = process.env.PORT || 6786

/*let persons = [
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
}*/



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
app.post('/api/persons', (request, response, next) => {
  personService.findAll()
      .then(persons => {
          const unique = persons.find(person => person.name === request.body.name);
          if (unique) {
              throw new ValidationError('Name must be unique');
          }
          return personService.addPerson(request.body.name, request.body.number);
      })
      .then(newPerson => response.json(newPerson))
      .catch(next); // Directly pass to next to handle any error
});

//Gets
app.get('/api/persons', (request, response, next) => {
  personService.findAll()
      .then(persons => response.json(persons))
      .catch(next);
});

app.get('/api/persons/:id', (request, response, next) => {
  personService.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        throw new NotFoundError('Person not found')
      }
    })
    .catch(next);
})


app.get('/info', (request, response, next) => {
  personService.length()
    .then(count => {
      response.send(
        `<p>Phonebook has info of ${count} people.</p>
        <br/>
        <br/>
        ${new Date().toDateString()}`
      );
    })
    .catch(next);
});
app.get('/favicon.ico', (req, res) => res.status(204).end())


//Delete
app.delete('/api/persons/:id', (request, response, next) => {
  personService.deleteById(request.params.id)
  .then(result => {
    if (!result) throw new NotFoundError('Person not found');
    response.status(204).end();
  })
  .catch(error => {
    if (error.kind === 'ObjectId') {
      next(new IdError('Invalid ID format'))
    } else {
      next(error)
    }
  })
})

//Put
app.put('/api/persons/:id', (request, response, next) => {
  const personEntry = {
  name:request.body.name,
  number:request.body.number,
  }
  
  personService.updatePersonNumber(request.params.id, personEntry)
    .then(updatedPerson => {
      response.json(updatedPerson); 
    })
    .catch(next); 
});

//Unkown 

const unkowonEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unkowonEndpoint)

//Error handling middleware
const errorHandler = (error,request, response ,next)=>{
  console.error(error.message)
  if (error instanceof ValidationError) {
    response.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof NotFoundError) {
    response.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof IdError) {
    response.status(error.statusCode).json({ error: error.message });
  } else {
    // Fallback for other types of errors not explicitly handled
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'An unexpected error occurred' : error.message;
    response.status(statusCode).json({ error: message });
  }
  next(error)
}


app.use(errorHandler)

//Listening
app.listen(port, hostname, () => {
  console.log(`Server running on link http://localhost:${port}`)
})