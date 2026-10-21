const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/proveedorController');
router.get('/', ctrl.getProveedores);
router.post('/', ctrl.createProveedor);
router.put('/:id', ctrl.updateProveedor);
router.delete('/:id', ctrl.deleteProveedor);
module.exports = router;