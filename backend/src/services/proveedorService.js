const pool = require('../config/db');
async function obtenerProveedores() { const [rows] = await pool.query('SELECT * FROM proveedores'); return rows; }
async function crearProveedor(datos) {
    const { nombre, rfc, telefono, correo } = datos;
    const [result] = await pool.query('INSERT INTO proveedores (nombre, rfc, telefono, correo) VALUES (?, ?, ?, ?)', [nombre, rfc, telefono, correo]);
    return result.insertId;
}
async function actualizarProveedor(id, datos) {
    const { nombre, rfc, telefono, correo } = datos;
    const [result] = await pool.query('UPDATE proveedores SET nombre=?, rfc=?, telefono=?, correo=? WHERE id=?', [nombre, rfc, telefono, correo, id]);
    return result.affectedRows;
}
async function eliminarProveedor(id) { const [result] = await pool.query('DELETE FROM proveedores WHERE id=?', [id]); return result.affectedRows; }
module.exports = { obtenerProveedores, crearProveedor, actualizarProveedor, eliminarProveedor };