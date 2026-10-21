const pool = require('../config/db');

async function obtenerUsuarios() {
    const [rows] = await pool.query('SELECT id, usuario, rol FROM usuarios');
    return rows;
}

async function crearUsuario(datos) {
    const { usuario, password, rol } = datos;
    const [result] = await pool.query('INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)', [usuario, password, rol]);
    return result.insertId;
}

async function actualizarUsuario(id, datos) {
    const { usuario, password, rol } = datos;
    const [result] = await pool.query('UPDATE usuarios SET usuario=?, password=?, rol=? WHERE id=?', [usuario, password, rol, id]);
    return result.affectedRows;
}

async function eliminarUsuario(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id=?', [id]);
    return result.affectedRows;
}

module.exports = { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario };