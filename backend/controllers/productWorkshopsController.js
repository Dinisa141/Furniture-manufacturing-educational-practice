const ProductWorkshop = require('../models/ProductWorkshop');  // <-- ProductWorkshop

exports.getAllProductWorkshops = async (req, res) => {
  try {
    const productWorkshops = await ProductWorkshop.findAll();
    res.json(productWorkshops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductWorkshopById = async (req, res) => {
  try {
    const productWorkshop = await ProductWorkshop.findById(req.params.id);
    if (!productWorkshop) {
      return res.status(404).json({ error: 'Product workshop not found' });
    }
    res.json(productWorkshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProductWorkshop = async (req, res) => {
  try {
    const newProductWorkshop = await ProductWorkshop.create(req.body);
    res.status(201).json(newProductWorkshop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProductWorkshop = async (req, res) => {
  try {
    const updatedProductWorkshop = await ProductWorkshop.update(req.params.id, req.body);
    if (!updatedProductWorkshop) {
      return res.status(404).json({ error: 'Product workshop not found' });
    }
    res.json(updatedProductWorkshop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProductWorkshop = async (req, res) => {
  try {
    const deletedProductWorkshop = await ProductWorkshop.delete(req.params.id);
    if (!deletedProductWorkshop) {
      return res.status(404).json({ error: 'Product workshop not found' });
    }
    res.json({ message: 'Product workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};