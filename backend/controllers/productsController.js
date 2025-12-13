const Product = require('../models/Product');  // <-- Изменили на Product

exports.getAllProducts = async (req, res) => {  // <-- Изменили имя функции
  try {
    const products = await Product.findAll();  // <-- Изменили на Product
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {  // <-- Изменили имя
  try {
    const product = await Product.findById(req.params.id);  // <-- Изменили на Product
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });  // <-- Изменили текст
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {  // <-- Изменили имя
  try {
    const newProduct = await Product.create(req.body);  // <-- Изменили на Product
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {  // <-- Изменили имя
  try {
    const updatedProduct = await Product.update(req.params.id, req.body);  // <-- Изменили на Product
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });  // <-- Изменили текст
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {  // <-- Изменили имя
  try {
    const deletedProduct = await Product.delete(req.params.id);  // <-- Изменили на Product
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });  // <-- Изменили текст
    }
    res.json({ message: 'Product deleted successfully' });  // <-- Изменили текст
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};