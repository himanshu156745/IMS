const logger = require('../config/logger');

const requestLogger = (req, res, next) => {

  //  Request aane ka time
  const start = Date.now();

  next();

  res.on('finish', () => {

    const duration = Date.now() - start;

    // Success responses (200-399)
    if (res.statusCode < 400) {
      logger.info({
        message  : '✅ HTTP Request Success',
        method   : req.method,
        url      : req.originalUrl,
        status   : res.statusCode,
        duration : `${duration}ms`,
        ip       : req.ip,
      });
    }

    // Client errors (400-499)
    else if (res.statusCode >= 400 && res.statusCode < 500) {
      logger.warn({
        message  : '⚠️ HTTP Request Warning',
        method   : req.method,
        url      : req.originalUrl,
        status   : res.statusCode,
        duration : `${duration}ms`,
        ip       : req.ip,
      });
    }

    //  Server errors (500+)
    else {
      logger.error({
        message  : '🔴 HTTP Request Failed',
        method   : req.method,
        url      : req.originalUrl,
        status   : res.statusCode,
        duration : `${duration}ms`,
        ip       : req.ip,
      });
    }

  });

};

module.exports = requestLogger;