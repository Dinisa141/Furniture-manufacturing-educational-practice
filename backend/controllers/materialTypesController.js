const MaterialType = require('../models/MaterialType');

exports.getAllMaterialTypes = async (req, res) => {
  try {
    const materialTypes = await MaterialType.findAll();
    res.json(materialTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaterialTypeById = async (req, res) => {
  try {
    const materialType = await MaterialType.findById(req.params.id);
    if (!materialType) {
      return res.status(404).json({ error: 'Material type not found' });
    }
    res.json(materialType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMaterialType = async (req, res) => {
  try {
    const newMaterialType = await MaterialType.create(req.body);
    res.status(201).json(newMaterialType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMaterialType = async (req, res) => {
  try {
    const updatedMaterialType = await MaterialType.update(req.params.id, req.body);
    if (!updatedMaterialType) {
      return res.status(404).json({ error: 'Material type not found' });
    }
    res.json(updatedMaterialType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMaterialType = async (req, res) => {
  try {
    const deletedMaterialType = await MaterialType.delete(req.params.id);
    if (!deletedMaterialType) {
      return res.status(404).json({ error: 'Material type not found' });
    }
    res.json({ message: 'Material type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};