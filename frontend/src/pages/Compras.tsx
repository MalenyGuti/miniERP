import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Compras() {
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  
  const [proveedorId, setProveedorId] = useState('');
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const cargarDatos = async () => {
    const [resCompras, resProveedores, resProductos] = await Promise.all([
      axios.get('/api/compras'), axios.get('/api/proveedores'), axios.get('/api/productos')
    ]);
    setCompras(resCompras.data.data); setProveedores(resProveedores.data.data); setProductos(resProductos.data.data);
  };

  useEffect(() => { cargarDatos(); }, []);

  const registrarCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proveedorId || !productoId) return alert('Selecciona un proveedor y un producto');

    const productoSeleccionado: any = productos.find((p: any) => p.id === Number(productoId));
    if (!productoSeleccionado) return alert('Producto no encontrado');

    const nuevaCompra = {
      proveedor_id: Number(proveedorId),
      productos: [{ producto_id: Number(productoId), cantidad: Number(cantidad), costo_unitario: productoSeleccionado.precio }]
    };

    try {
      await axios.post('/api/compras', nuevaCompra);
      alert('¡Compra registrada! El stock ha aumentado.');
      setCantidad(1); setProductoId(''); setProveedorId(''); cargarDatos(); 
    } catch (error) { alert('Error al registrar la compra'); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#16a085' }}>Módulo de Compras</h1>

      <form onSubmit={registrarCompra} style={formStyle}>
        <select value={proveedorId} onChange={e => setProveedorId(e.target.value)} required style={inputStyle}>
          <option value="">Seleccione Proveedor</option>
          {proveedores.map((prov: any) => <option key={prov.id} value={prov.id}>{prov.nombre}</option>)}
        </select>

        <select value={productoId} onChange={e => setProductoId(e.target.value)} required style={inputStyle}>
          <option value="">Seleccione Producto</option>
          {productos.map((p: any) => <option key={p.id} value={p.id}>{p.nombre} - Costo: ${p.precio}</option>)}
        </select>

        <input type="number" min="1" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} required style={inputStyle} placeholder="Cantidad" />

        <button type="submit" style={{...inputStyle, background: '#16a085', color: 'white', cursor: 'pointer', fontWeight: 'bold', flex: '0 0 auto'}}>Comprar</button>
      </form>

      <h2 style={{ color: '#2c3e50', marginTop: '30px' }}>Historial de Compras</h2>
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#16a085', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Folio</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Fecha</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Proveedor</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c: any, index) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f0fdfa' }}>
                <td style={{ padding: '12px 15px', color: '#333' }}>#{c.id}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{new Date(c.fecha).toLocaleString()}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{c.proveedor || 'Proveedor eliminado'}</td>
                <td style={{ padding: '12px 15px', color: '#333', fontWeight: 'bold' }}>${c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const formStyle = { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' };
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', flex: '1 1 150px', backgroundColor: '#ffffff', color: '#333333', fontSize: '14px' };