const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// MIDDLEWARE
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// ROUTES
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
