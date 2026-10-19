const productoService = require('../services/productoService');

async function getProductos(req, res) {
  try {
    const productos = await productoService.obtenerProductos(req.query);
    res.status(200).json({ success: true, data: productos });
  } catch (error) {
    res.status(500).json({ success: false, error: { code: 'DB_ERROR', message: error.message } });
  }
}

async function createProducto(req, res) {
  res.status(201).json({ success: true, message: 'Producto creado (pendiente de implementar)' });
}

module.exports = { getProductos, createProducto };