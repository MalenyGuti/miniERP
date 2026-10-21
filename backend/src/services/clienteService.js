const pool = require('../config/db');

async function obtenerClientes() {
    const [rows] = await pool.query('SELECT * FROM clientes');
    return rows;
}

async function crearCliente(datos) {
    const { nombre, rfc, telefono, correo } = datos;
    const query = 'INSERT INTO clientes (nombre, rfc, telefono, correo) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [nombre, rfc, telefono, correo]);
    return result.insertId;
}

async function actualizarCliente(id, datos) {
    const { nombre, rfc, telefono, correo } = datos;
    const query = 'UPDATE clientes SET nombre=?, rfc=?, telefono=?, correo=? WHERE id=?';
    const [result] = await pool.query(query, [nombre, rfc, telefono, correo, id]);
    return result.affectedRows;
}

async function eliminarCliente(id) {
    const query = 'DELETE FROM clientes WHERE id=?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
}

module.exports = { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente };