const ProductType = require('../models/ProductType');

exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll();
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductTypeById = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.id);
    if (!productType) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    res.json(productType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProductType = async (req, res) => {
  try {
    const newProductType = await ProductType.create(req.body);
    res.status(201).json(newProductType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProductType = async (req, res) => {
  try {
    const updatedProductType = await ProductType.update(req.params.id, req.body);
    if (!updatedProductType) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    res.json(updatedProductType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProductType = async (req, res) => {
  try {
    const deletedProductType = await ProductType.delete(req.params.id);
    if (!deletedProductType) {
      return res.status(404).json({ error: 'Product type not found' });
    }
    res.json({ message: 'Product type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};