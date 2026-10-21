import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Clientes from './pages/Clientes';
import Proveedores from './pages/Proveedores';
import Usuarios from './pages/Usuarios';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio/>} />
          <Route path="productos" element={<Productos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="compras" element={<Compras />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


