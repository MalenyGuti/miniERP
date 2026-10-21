const pool = require('../config/db'); 

// 1. LEER (GET)
async function obtenerProductos() {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
}

// 2. CREAR (POST)
async function crearProducto(datos) {
    const { nombre, codigo, precio, stock, categoria } = datos;
    const query = 'INSERT INTO productos (nombre, codigo, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [nombre, codigo, precio, stock, categoria || 'General']);
    return result.insertId; 
}

// 3. ACTUALIZAR (PUT)
async function actualizarProducto(id, datos) {
    const { nombre, codigo, precio, stock, categoria } = datos;
    const query = 'UPDATE productos SET nombre=?, codigo=?, precio=?, stock=?, categoria=? WHERE id=?';
    const [result] = await pool.query(query, [nombre, codigo, precio, stock, categoria, id]);
    return result.affectedRows; 
}

// 4. ELIMINAR (DELETE)
async function eliminarProducto(id) {
    const query = 'DELETE FROM productos WHERE id=?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
}

// EXPORTAMOS LAS 4 FUNCIONES
module.exports = { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto };