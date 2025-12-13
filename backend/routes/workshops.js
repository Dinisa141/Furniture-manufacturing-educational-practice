const express = require('express');
const router = express.Router();
const workshopsController = require('../controllers/workshopsController');

router.get('/', workshopsController.getAllWorkshops);
router.get('/:id', workshopsController.getWorkshopById);
router.post('/', workshopsController.createWorkshop);
router.put('/:id', workshopsController.updateWorkshop);
router.delete('/:id', workshopsController.deleteWorkshop);

module.exports = router;