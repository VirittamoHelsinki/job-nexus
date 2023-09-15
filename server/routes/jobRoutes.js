// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Define routes for jobs
router.get('/available', jobController.getAvailableJobs);
router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);

module.exports = router;