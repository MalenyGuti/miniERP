import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Proveedores() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nombre: '', rfc: '', telefono: '', correo: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargar = async () => { 
    try {
      const res = await axios.get('/api/proveedores'); 
      setData(res.data.data); 
    } catch (error) { console.error(error); }
  };
  
  useEffect(() => { cargar(); }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editandoId) await axios.put(`/api/proveedores/${editandoId}`, form);
      else await axios.post('/api/proveedores', form);
      setForm({ nombre: '', rfc: '', telefono: '', correo: '' }); 
      setEditandoId(null); 
      cargar();
    } catch (error) { console.error(error); }
  };

  const eliminar = async (id: number) => { 
    if(window.confirm('¿Seguro que deseas eliminar este proveedor?')) { 
      await axios.delete(`/api/proveedores/${id}`); 
      cargar(); 
    } 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Gestión de Proveedores</h1>
      
      {/* FORMULARIO CON FONDO BLANCO Y INPUTS CLAROS */}
      <form onSubmit={guardar} style={formStyle}>
        <input placeholder="Nombre de la empresa" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={inputStyle} />
        <input placeholder="RFC" value={form.rfc} onChange={e => setForm({...form, rfc: e.target.value})} style={inputStyle} />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} style={inputStyle} />
        <input type="email" placeholder="Correo" value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} style={inputStyle} />
        
        <button type="submit" style={btnStyle(editandoId)}>
          {editandoId ? 'Actualizar' : 'Guardar'}
        </button>
        
        {editandoId && (
          <button type="button" onClick={() => { setEditandoId(null); setForm({ nombre: '', rfc: '', telefono: '', correo: '' }); }} style={{ padding: '10px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA CON DISEÑO LIMPIO */}
      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#34495e', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>RFC</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Teléfono</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Correo</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p: any, index) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.nombre}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.rfc}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.telefono}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{p.correo}</td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button onClick={() => { setForm(p); setEditandoId(p.id); }} style={btnEditar}>Editar</button>
                  <button onClick={() => eliminar(p.id)} style={btnEliminar}>Eliminar</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No hay proveedores registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ESTILOS
const formStyle = { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' };
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', flex: '1 1 200px', backgroundColor: '#fff', color: '#333', fontSize: '14px' };
const btnStyle = (editing: number | null) => ({ padding: '12px 20px', background: editing ? '#f39c12' : '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' });
const btnEditar = { padding: '6px 12px', marginRight: '8px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnEliminar = { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };