// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

// Define routes for skills
router.get('/', skillController.getAllSkills);
router.post('/', skillController.createSkill);
router.get('/:id', skillController.getSkillById);

module.exports = router;