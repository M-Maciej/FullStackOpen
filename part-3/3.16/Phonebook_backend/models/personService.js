const Person = require('./person');
const { DatabaseError, NotFoundError, IdError } = require('./customErrors');

const findAll = () => {
  return Person.find({})
    .then(result => result)
    .catch(error => {
      throw new DatabaseError(`Error finding all persons: ${error.message}`);
    });
};

const findById = (id) => {
  return Person.findById(id)
    .then(person => {
      if (!person) {
        throw new NotFoundError('Person not found');
      }
      return person;
    })
    .catch(error => {
      if (error.name === 'CastError') {
        throw new IdError('Invalid ID format');
      }
      throw new DatabaseError(`Error finding person by ID: ${error.message}`);
    });
};

const addPerson = (name, number) => {
  const person = new Person({ name, number });
  return person.save()
    .then(newPerson => newPerson)
    .catch(error => {
      throw new DatabaseError(`Error adding person: ${error.message}`);
    });
};

const deleteById = (id) => {
  return Person.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        throw new NotFoundError('Person not found');
      }
      return result;
    })
    .catch(error => {
      if (error.name === 'CastError') {
        throw new IdError('Invalid ID format');
      }
      throw new DatabaseError(`Error deleting person: ${error.message}`);
    });
};

const length = () => {
  return Person.countDocuments({})
    .then(count => count)
    .catch(error => {
      throw new DatabaseError(`Error counting persons: ${error.message}`);
    });
};

module.exports = {
  findAll,
  findById,
  addPerson,
  deleteById,
  length,
};
