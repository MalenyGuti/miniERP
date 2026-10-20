const pool = require('../config/db'); // Asegúrate de que esta ruta sea correcta hacia tu db.js

// Función para obtener todos los productos de la BD
async function obtenerProductos() {
    // Hacemos la consulta SQL real
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
}

// Función para guardar un producto en la BD
async function crearProducto(datos) {
    const { nombre, codigo, precio, stock, categoria } = datos;
    
    // Hacemos el INSERT real. Si 'categoria' viene vacía, le ponemos un valor por defecto
    const query = 'INSERT INTO productos (nombre, codigo, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [nombre, codigo, precio, stock, categoria || 'General']);
    
    return result.insertId; // Devolvemos el ID del producto recién creado
}

module.exports = { obtenerProductos, crearProducto };