'use strict';

const express = require('express');
const morgan = require('morgan');

// Create the Express app.
const app = express();

// Setup request body JSON parsing.
app.use(express.json());

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));

// Setup a friendly greeting for the root route.
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API Authentication with Express project!',
  });
});

// Send 404 if no other route matched.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// Set our port.
app.set('port', process.env.PORT || 5000);

// Start listening on our port.
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
