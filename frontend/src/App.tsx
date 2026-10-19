import { useEffect, useState } from 'react';
import axios from 'axios';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos')
      .then(response => setProductos(response.data.data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Mini ERP - Productos</h1>
      {productos.length === 0 ? (
        <p>No hay productos o el backend está apagado...</p>
      ) : (
        <ul>
          {productos.map(p => (
            <li key={p.id}>
              <strong>{p.nombre}</strong> - ${p.precio} (Stock: {p.stock})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;