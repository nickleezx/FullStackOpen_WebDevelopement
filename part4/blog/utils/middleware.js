const logger = require('./logger');
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
    logger.info(req.method)
    logger.info(req.path)
    logger.info(req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown Endpoint"});
}

const errorHandler = (error, req, res, next) => {
    logger.info(error);
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'))
      return res.status(400).json({error: 'expected `username` to be unique'})
    else if (error.name === 'JsonWebTokenError')
      return res.status(400).json({error: "invalid or missing token"})
    else if (error.name === 'TokenExpiredError')
      return res.status(400).json({error: 'Token expired'})

    logger.info('---')

    next(error);
}

const tokenExtractor = (req, res, next) => {

  
  const authorization = req.get('authorization')
  if (authorization?.startsWith('Bearer ')){
    req.token = authorization.replace('Bearer ', '')
  }
  
  next()
}

const userExtractor = (req, res, next) => {
  const token = req?.token
  const decoded = jwt.verify(token, process.env.SECRET)
  req.user = decoded?.id

  next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}