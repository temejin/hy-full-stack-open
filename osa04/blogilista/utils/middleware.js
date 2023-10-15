const logger = require('./logger')

const errorHandler = (error, request, response,  next) => {
  logger.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}

const requestLogger = (request, response, next) => {
  logger.info(request.method)
  logger.info(request.path)
  logger.info(request.body)
  next()
}

module.exports = {
  errorHandler,
  requestLogger
}
