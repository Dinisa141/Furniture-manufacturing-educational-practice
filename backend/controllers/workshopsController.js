const Workshop = require('../models/Workshop');  // <-- Workshop

exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createWorkshop = async (req, res) => {
  try {
    const newWorkshop = await Workshop.create(req.body);
    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateWorkshop = async (req, res) => {
  try {
    const updatedWorkshop = await Workshop.update(req.params.id, req.body);
    if (!updatedWorkshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json(updatedWorkshop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkshop = async (req, res) => {
  try {
    const deletedWorkshop = await Workshop.delete(req.params.id);
    if (!deletedWorkshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};