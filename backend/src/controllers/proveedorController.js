const proveedorService = require('../services/proveedorService');
async function getProveedores(req, res) {
    try { const data = await proveedorService.obtenerProveedores(); res.json({ success: true, data }); } 
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
}
async function createProveedor(req, res) {
    try { const id = await proveedorService.crearProveedor(req.body); res.status(201).json({ success: true, id }); } 
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
}
async function updateProveedor(req, res) {
    try { const filas = await proveedorService.actualizarProveedor(req.params.id, req.body); if(filas===0) return res.status(404).json({success:false}); res.json({ success: true }); } 
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
}
async function deleteProveedor(req, res) {
    try { const filas = await proveedorService.eliminarProveedor(req.params.id); if(filas===0) return res.status(404).json({success:false}); res.json({ success: true }); } 
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
}
module.exports = { getProveedores, createProveedor, updateProveedor, deleteProveedor };