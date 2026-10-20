const productoService = require('../services/productoService');

async function getProductos(req, res) {
    try {
        const productos = await productoService.obtenerProductos();
        res.status(200).json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: { code: 'DB_ERROR', message: error.message } });
    }
}

async function createProducto(req, res) {
    try {
        const nuevoId = await productoService.crearProducto(req.body);
        res.status(201).json({ 
            success: true, 
            message: 'Producto guardado en la base de datos', 
            id: nuevoId 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al guardar', error: error.message });
    }
}

module.exports = { getProductos, createProducto };