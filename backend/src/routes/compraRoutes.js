const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.get('/', compraController.getCompras);
router.post('/', compraController.createCompra);

module.exports = router;