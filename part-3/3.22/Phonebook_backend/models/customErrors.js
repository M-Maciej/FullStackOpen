class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
        this.statusCode = 400
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
        this.statusCode = 404
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message)
        this.name = 'DatabaseError'
        this.statusCode = 500
    }
}
class IdError extends Error {
    constructor(message) {
        super(message)
        this.name = 'IdError'
        this.statusCode = 400 // Bad Request seems appropriate for invalid ID errors
    }
}

module.exports = { ValidationError, NotFoundError, DatabaseError, IdError }
