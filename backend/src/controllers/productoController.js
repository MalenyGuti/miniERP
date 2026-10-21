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
        res.status(201).json({ success: true, message: 'Producto guardado', id: nuevoId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al guardar', error: error.message });
    }
}

async function updateProducto(req, res) {
    try {
        const { id } = req.params; 
        const filasAfectadas = await productoService.actualizarProducto(id, req.body);
        
        if (filasAfectadas === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar', error: error.message });
    }
}

async function deleteProducto(req, res) {
    try {
        const { id } = req.params;
        const filasAfectadas = await productoService.eliminarProducto(id);
        
        if (filasAfectadas === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar', error: error.message });
    }
}

// EXPORTAMOS LAS 4 FUNCIONES (Aquí estaba tu error)
module.exports = { getProductos, createProducto, updateProducto, deleteProducto };