const ventaService = require('../services/ventaService');

async function getVentas(req, res) {
    try {
        const ventas = await ventaService.obtenerVentas();
        res.json({ success: true, data: ventas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function createVenta(req, res) {
    try {
        const nuevaVentaId = await ventaService.registrarVenta(req.body);
        res.status(201).json({ success: true, message: 'Venta registrada', id: nuevaVentaId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al registrar venta', error: error.message });
    }
}

// ¡ESTA LÍNEA ES LA MÁS IMPORTANTE!
module.exports = { getVentas, createVenta };