const compraService = require('../services/compraService');

async function getCompras(req, res) {
    try {
        const compras = await compraService.obtenerCompras();
        res.json({ success: true, data: compras });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function createCompra(req, res) {
    try {
        const nuevaCompraId = await compraService.registrarCompra(req.body);
        res.status(201).json({ success: true, message: 'Compra registrada', id: nuevaCompraId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar compra', error: error.message });
    }
}

module.exports = { getCompras, createCompra };