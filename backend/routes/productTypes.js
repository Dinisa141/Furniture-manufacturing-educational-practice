const express = require('express');
const router = express.Router();
const productTypesController = require('../controllers/productTypesController');

router.get('/', productTypesController.getAllProductTypes);
router.get('/:id', productTypesController.getProductTypeById);
router.post('/', productTypesController.createProductType);
router.put('/:id', productTypesController.updateProductType);
router.delete('/:id', productTypesController.deleteProductType);

module.exports = router;