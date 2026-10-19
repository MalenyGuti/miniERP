function validarProducto(req, res, next) {
  const { nombre, codigo, precio, stock } = req.body;
  if (!nombre || !codigo || precio <= 0 || stock < 0) {
    return res.status(400).json({ success: false, message: 'Datos inválidos' });
  }
  next();
}
module.exports = { validarProducto };