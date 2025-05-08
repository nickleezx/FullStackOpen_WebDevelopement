const logger = require('./logger');

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

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
}