const pool = require('../config/db');

async function registrarCompra(datosCompra) {
    const { proveedor_id, productos } = datosCompra;
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        let total = 0;
        productos.forEach(p => { total += (p.cantidad * p.costo_unitario); });

        const [compraResult] = await connection.query(
            'INSERT INTO compras (proveedor_id, total) VALUES (?, ?)', 
            [proveedor_id, total]
        );
        const compra_id = compraResult.insertId;

        for (let p of productos) {
            const subtotal = p.cantidad * p.costo_unitario;
            
            await connection.query(
                'INSERT INTO compra_detalle (compra_id, producto_id, cantidad, costo_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [compra_id, p.producto_id, p.cantidad, p.costo_unitario, subtotal]
            );

            // SUMAMOS el stock
            await connection.query(
                'UPDATE productos SET stock = stock + ? WHERE id = ?',
                [p.cantidad, p.producto_id]
            );
        }

        await connection.commit();
        return compra_id;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function obtenerCompras() {
    const [rows] = await pool.query(`
        SELECT c.id, c.fecha, c.total, p.nombre AS proveedor 
        FROM compras c 
        LEFT JOIN proveedores p ON c.proveedor_id = p.id 
        ORDER BY c.id DESC
    `);
    return rows;
}

module.exports = { registrarCompra, obtenerCompras };