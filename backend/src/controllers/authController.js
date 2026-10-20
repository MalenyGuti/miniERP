const jwt = require('jsonwebtoken');
require('dotenv').config();

function login(req, res) {
  const { usuario, password } = req.body;

  // Simulamos usuario y contraseña (luego conectarás con tu BD)
  if (usuario === 'admin' && password === 'maleny') {
    const token = jwt.sign({ usuario }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
}

module.exports = { login };

