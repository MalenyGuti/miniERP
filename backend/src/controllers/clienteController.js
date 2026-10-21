const clienteService = require('../services/clienteService');

async function getClientes(req, res) {
    try {
        const clientes = await clienteService.obtenerClientes();
        res.status(200).json({ success: true, data: clientes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function createCliente(req, res) {
    try {
        if (!req.body.nombre) return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
        const nuevoId = await clienteService.crearCliente(req.body);
        res.status(201).json({ success: true, message: 'Cliente guardado', id: nuevoId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateCliente(req, res) {
    try {
        const filas = await clienteService.actualizarCliente(req.params.id, req.body);
        if (filas === 0) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        res.status(200).json({ success: true, message: 'Cliente actualizado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteCliente(req, res) {
    try {
        const filas = await clienteService.eliminarCliente(req.params.id);
        if (filas === 0) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        res.status(200).json({ success: true, message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getClientes, createCliente, updateCliente, deleteCliente };