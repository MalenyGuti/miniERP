const pool = require('../config/db');

async function registrarVenta(datosVenta) {
    const { cliente_id, productos } = datosVenta; 
    // productos es un arreglo: [{ producto_id: 1, cantidad: 2, precio_unitario: 100 }]
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // Iniciamos la transacción

        // 1. Calcular el total
        let total = 0;
        productos.forEach(p => { total += (p.cantidad * p.precio_unitario); });

        // 2. Insertar la cabecera de la venta
        const [ventaResult] = await connection.query(
            'INSERT INTO ventas (cliente_id, total) VALUES (?, ?)', 
            [cliente_id, total]
        );
        const venta_id = ventaResult.insertId;

        // 3. Insertar el detalle y restar stock
        for (let p of productos) {
            const subtotal = p.cantidad * p.precio_unitario;
            
            // Insertar en venta_detalle
            await connection.query(
                'INSERT INTO venta_detalle (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [venta_id, p.producto_id, p.cantidad, p.precio_unitario, subtotal]
            );

            // Restar el stock en la tabla productos
            await connection.query(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [p.cantidad, p.producto_id]
            );
        }

        await connection.commit(); // Si todo sale bien, guardamos los cambios
        return venta_id;

    } catch (error) {
        await connection.rollback(); // Si algo falla, deshacemos todo
        throw error;
    } finally {
        connection.release(); // Liberamos la conexión
    }
}

async function obtenerVentas() {
    const [rows] = await pool.query(`
        SELECT v.id, v.fecha, v.total, c.nombre AS cliente 
        FROM ventas v 
        LEFT JOIN clientes c ON v.cliente_id = c.id 
        ORDER BY v.id DESC
    `);
    return rows;
}

module.exports = { registrarVenta, obtenerVentas };