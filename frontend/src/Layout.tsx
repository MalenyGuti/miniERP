import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* SIDEBAR */}
      <div style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mini ERP</h2>
        <Link to="/" style={linkStyle}>🏠 Inicio</Link>
        <Link to="/productos" style={linkStyle}>📦 Productos</Link>
        <Link to="/clientes" style={linkStyle}>👥 Clientes</Link>
        <Link to="/proveedores" style={linkStyle}>🚚 Proveedores</Link>
        <Link to="/usuarios" style={linkStyle}>🔐 Usuarios</Link>
        <Link to="/ventas" style={linkStyle}>💰 Ventas</Link>
        <Link to="/compras" style={linkStyle}>🛍️ Compras</Link>
      </div>
      {/* CONTENIDO */}
      <div style={{ flex: 1, padding: '30px', background: '#ecf0f1', overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
const linkStyle = { color: 'white', textDecoration: 'none', padding: '12px', background: '#34495e', borderRadius: '5px', fontWeight: 'bold' };