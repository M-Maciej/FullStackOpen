const Person = require('./person')
const {
    DatabaseError,
    NotFoundError,
    IdError,
    ValidationError,
} = require('./customErrors')

const findAll = () => {
    return Person.find({})
        .then((result) => result)
        .catch((error) => {
            throw new DatabaseError(`Error finding all persons: ${error.message}`)
        })
}

const findById = (id) => {
    return Person.findById(id)
        .then((person) => {
            if (!person) {
                throw new NotFoundError('Person not found')
            }
            return person
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                throw new IdError('Invalid ID format')
            }
            throw new DatabaseError(`Error finding person by ID: ${error.message}`)
        })
}

const addPerson = (name, number) => {
    const person = new Person({ name, number })
    return person.save().catch((error) => {
        if (error.name === 'ValidationError') {
            throw new ValidationError(error.message)
        } else {
            throw new DatabaseError(`Error adding person: ${error.message}`)
        }
    })
}

const deleteById = (id) => {
    return Person.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                throw new NotFoundError('Person not found')
            }
            return result
        })
        .catch((error) => {
            if (error.name === 'CastError') {
                throw new IdError('Invalid ID format')
            }
            throw new DatabaseError(`Error deleting person: ${error.message}`)
        })
}

const length = () => {
    return Person.countDocuments({})
        .then((count) => count)
        .catch((error) => {
            throw new DatabaseError(`Error counting persons: ${error.message}`)
        })
}

const updatePersonNumber = (id, personEntry) => {
    // First, validate the person exists and the name matches
    return findById(id)
        .then((existingPerson) => {
            // Check if the name matches the existing record
            if (existingPerson.name !== personEntry.name) {
                throw new ValidationError('The name cannot be changed.')
            }
            // If validation passes, proceed with the update
            return Person.findByIdAndUpdate(
                id,
                { number: personEntry.number },
                { new: true, runValidators: true, context: 'query' }
            )
        })
        .then((updatedPerson) => {
            if (!updatedPerson) {
                throw new NotFoundError(`Person not found with id: ${id}`)
            }
            return updatedPerson
        })
        .catch((error) => {
            // Handle different kinds of errors
            if (error.name === 'CastError') {
                throw new IdError(`Invalid ID format: ${id}`)
            } else if (error.name === 'ValidationError') {
                throw new ValidationError(`Validation failed: ${error.message}`)
            } else if (
                error instanceof NotFoundError ||
        error instanceof ValidationError ||
        error instanceof IdError
            ) {
                // Re-throw custom errors as they are
                throw error
            } else {
                // For any other errors, consider them as database-related errors
                throw new DatabaseError(`Error updating person: ${error.message}`)
            }
        })
}

module.exports = {
    findAll,
    findById,
    addPerson,
    deleteById,
    length,
    updatePersonNumber,
}
