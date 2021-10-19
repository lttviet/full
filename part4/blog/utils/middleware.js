import morgan from 'morgan'
import logger from './logger'

const requestLogger = morgan('dev')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token' })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).send({ error: 'token expired' })
  }

  logger.error(error.message)
  return next(error)
}

export { requestLogger, unknownEndpoint, errorHandler }
