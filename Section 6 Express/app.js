
const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const { stringify } = require('querystring');

const tourRouter = require('./routes/tourRoutes');
const app = express();

// middleware
app.use(express.json());
// third party middleware
app.use(morgan('dev'));

// Mount middleware in development
app.use('/api/v1/tours',tourRouter)


module.exports = app