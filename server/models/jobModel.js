// models/jobModel.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  //_id: {type: mongoose.Schema.Types.ObjectId},
  company: String,
  role: String,
  skills: [String], //skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  link: String,
  deadline: String,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;