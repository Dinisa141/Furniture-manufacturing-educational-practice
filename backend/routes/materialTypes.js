const express = require('express');
const router = express.Router();
const materialTypesController = require('../controllers/materialTypesController');

router.get('/', materialTypesController.getAllMaterialTypes);
router.get('/:id', materialTypesController.getMaterialTypeById);
router.post('/', materialTypesController.createMaterialType);
router.put('/:id', materialTypesController.updateMaterialType);
router.delete('/:id', materialTypesController.deleteMaterialType);

module.exports = router;