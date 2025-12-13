const express = require('express');
const router = express.Router();
const productWorkshopsController = require('../controllers/productWorkshopsController');

router.get('/', productWorkshopsController.getAllProductWorkshops);
router.get('/:id', productWorkshopsController.getProductWorkshopById);
router.post('/', productWorkshopsController.createProductWorkshop);
router.put('/:id', productWorkshopsController.updateProductWorkshop);
router.delete('/:id', productWorkshopsController.deleteProductWorkshop);

module.exports = router;