
const { createLogger, format, transports } = require('winston');
const path = require('path');
const logDir = path.join(__dirname, '../logs');

// Custom Log Format
const logFormat = format.combine(

  format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss'
  }),
  format.errors({ stack: true }),
  format.json()
);

// Logger
const logger = createLogger({

  level: 'info',
  format: logFormat,
  transports: [

    // Sirf errors = error.log mein
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,  // 5MB
      maxFiles: 5,
    }),

    // Sab kuch = combined.log mein
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880,  // 5MB
      maxFiles: 5,
    }),

  ],

  // Unhandled exceptions
  exceptionHandlers: [
    new transports.File({
      filename: path.join(logDir, 'exceptions.log')
    })
  ],

  // Unhandled promise rejections 
  rejectionHandlers: [
    new transports.File({
      filename: path.join(logDir, 'exceptions.log')
    })
  ]
});

//at the time of Development mein console mein bhi show karega
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),  // Colors 
      format.simple()     // Simple format
    )
  }));
}

module.exports = logger;