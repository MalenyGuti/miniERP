const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { validarProducto } = require('../middlewares/validators');
const authenticateToken = require('../middlewares/auth');

router.get('/', productoController.getProductos);
router.post('/', authenticateToken, validarProducto, productoController.createProducto);
// Aquí irían las rutas PUT y DELETE más adelante

module.exports = router;