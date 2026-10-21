const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { validarProducto } = require('../middlewares/validators');
const authenticateToken = require('../middlewares/auth');

// Rutas
router.get('/', productoController.getProductos);
router.post('/', authenticateToken, validarProducto, productoController.createProducto);
router.put('/:id', authenticateToken, validarProducto, productoController.updateProducto);
router.delete('/:id', authenticateToken, productoController.deleteProducto);

module.exports = router;