// Aquí irá la lógica real de la base de datos más adelante
async function obtenerProductos(filtros) {
  // Simulamos la respuesta para probar que el servidor levanta
  return [
    { id: 1, nombre: "Laptop Lenovo", precio: 12500, stock: 10 }
  ];
}

module.exports = { obtenerProductos };