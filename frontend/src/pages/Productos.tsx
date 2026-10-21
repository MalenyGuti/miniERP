import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Productos() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nombre: '', codigo: '', precio: 0, stock: 0, categoria: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargar = async () => { 
    try { const res = await axios.get('/api/productos'); setData(res.data.data); } catch (error) { console.error(error); }
  };
  useEffect(() => { cargar(); }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editandoId) await axios.put(`/api/productos/${editandoId}`, form);
      else await axios.post('/api/productos', form);
      setForm({ nombre: '', codigo: '', precio: 0, stock: 0, categoria: '' }); setEditandoId(null); cargar();
    } catch (error) { console.error(error); }
  };

  const eliminar = async (id: number) => { 
    if(window.confirm('¿Eliminar producto?')) { await axios.delete(`/api/productos/${id}`); cargar(); } 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#27ae60' }}>Gestión de Productos</h1>
      
      <form onSubmit={guardar} style={formStyle}>
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={inputStyle} />
        <input placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required style={inputStyle} />
        <input type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({...form, precio: Number(e.target.value)})} required style={inputStyle} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} required style={inputStyle} />
        <input placeholder="Categoría" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} style={inputStyle} />
        
        <button type="submit" style={btnStyle(editandoId, '#27ae60')}>{editandoId ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#27ae60', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Código</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Precio</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Categoría</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: any, index) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f0fdf4' }}>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.nombre}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.codigo}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>${p.precio}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.stock}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.categoria}</td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button onClick={() => { setForm(p); setEditandoId(p.id); }} style={btnEditar}>Editar</button>
                  <button onClick={() => eliminar(p.id)} style={btnEliminar}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const formStyle = { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' as const };
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', flex: '1 1 150px', backgroundColor: '#ffffff', color: '#333333', fontSize: '14px' };
const btnStyle = (editing: number | null, color: string) => ({ padding: '12px 20px', background: editing ? '#f39c12' : color, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' });
const btnEditar = { padding: '6px 12px', marginRight: '8px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnEliminar = { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };