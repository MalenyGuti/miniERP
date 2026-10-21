const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');

// 1. Importación de TODAS las rutas
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const compraRoutes = require('./routes/compraRoutes');
const authController = require('./controllers/authController');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// 2. Uso de las rutas
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/compras', compraRoutes);
app.post('/api/auth/login', authController.login);

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ${PORT}');
}
)