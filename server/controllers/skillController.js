// controllers/skillController.js
const Skill = require('../models/skillModel');

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve skills' });
  }
};
  
const createSkill = async (req, res) => {
    try {
      const { name, _uid } = req.body;
      const skill = new Skill({ name, _uid });
      const savedSkill = await skill.save();
      res.status(201).json(savedSkill);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create skill' });
    }
};
  
const getSkillById = async (req, res) => {
    try {
      const { id } = req.params;
      const skill = await Skill.findById(id);
      if (!skill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      res.json(skill);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve skill' });
    }
};
  
  // Export the controller functions
  module.exports = {
    getAllSkills,
    createSkill,
    getSkillById,
  };