// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const skillRoutes = require('./routes/skillRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/jobs', jobRoutes);
app.use('/api/skills', skillRoutes);

module.exports = app;