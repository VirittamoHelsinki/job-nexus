// controllers/jobController.js
const Job = require('../models/jobModel');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving jobs' });
  }
};

const getAvailableJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    // Filter jobs to get only available ones
    const today = new Date();
    const availableJobs = jobs.filter((job) => {
      const deadlineDate = new Date(job.deadline);
      today.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);
      return deadlineDate >= today;
    });

    res.json(availableJobs);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving available jobs' });
  }
};

const createJob = async (req, res) => {
  try {
    // Create a new job
    const { company, role, skills, link, deadline, team } = req.body;
    const job = new Job({ company, role, skills, link, deadline, team });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: 'Error creating job' });
  }
};

const getJobById = async (req, res) => {
  try {
    // Retrieve a job by ID
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving job' });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const update = req.body;

    // Update the job with the given ID and return the updated document
    const job = await Job.findByIdAndUpdate(jobId, update, { new: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error updating job' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting job' });
  }
};

// Export the controller functions
module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  getAvailableJobs,
  updateJob,
  deleteJob,
};