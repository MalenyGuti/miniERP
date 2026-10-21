const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Las funciones aquí deben coincidir con las del module.exports de arriba
router.get('/', ventaController.getVentas);
router.post('/', ventaController.createVenta);

module.exports = router;