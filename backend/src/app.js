const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const logger = require('./config/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger)

app.get('/', (req, res) => {
    res.status(200).json({ key: "Express App is successfully running" })
});

// Agar koi route nahi mila
app.use((req, res) => {
  logger.warn({
    message : '⚠️ Route Not Found',
    method  : req.method,
    url     : req.originalUrl,
  });

  res.status(404).json({ 
    success : false,
    message : 'Route not found' 
  });
});

// global error
app.use((err, req, res) => {
  logger.error({
    message : '🔴 Server Error',
    error   : err.message,
    stack   : err.stack,
    method  : req.method,
    url     : req.originalUrl,
  });

  res.status(500).json({ 
    success : false,
    message : 'Internal Server Error' 
  });
});





module.exports = app;