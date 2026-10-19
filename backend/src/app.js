const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const productoRoutes = require('./routes/productoRoutes');
const authController = require('./controllers/authController'); // <--- AGREGA ESTA LÍNEA AQUÍ

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api/productos', productoRoutes);
// ... otras rutas
app.post('/api/auth/login', authController.login); // Ruta de login
module.exports = app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});