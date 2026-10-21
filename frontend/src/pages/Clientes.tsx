import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Clientes() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nombre: '', rfc: '', telefono: '', correo: '' });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargar = async () => { 
    try { const res = await axios.get('/api/clientes'); setData(res.data.data); } catch (error) { console.error(error); }
  };
  useEffect(() => { cargar(); }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editandoId) await axios.put(`/api/clientes/${editandoId}`, form);
      else await axios.post('/api/clientes', form);
      setForm({ nombre: '', rfc: '', telefono: '', correo: '' }); setEditandoId(null); cargar();
    } catch (error) { console.error(error); }
  };

  const eliminar = async (id: number) => { 
    if(window.confirm('¿Eliminar cliente?')) { await axios.delete(`/api/clientes/${id}`); cargar(); } 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#2980b9' }}>Gestión de Clientes</h1>
      
      <form onSubmit={guardar} style={formStyle}>
        <input placeholder="Nombre Completo" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={inputStyle} />
        <input placeholder="RFC" value={form.rfc} onChange={e => setForm({...form, rfc: e.target.value})} style={inputStyle} />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} style={inputStyle} />
        <input type="email" placeholder="Correo" value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} style={inputStyle} />
        
        <button type="submit" style={btnStyle(editandoId, '#2980b9')}>{editandoId ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#2980b9', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>RFC</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Teléfono</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Correo</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c: any, index) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f0f8ff' }}>
                <td style={{ padding: '12px 15px', color: '#333' }}>{c.nombre}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{c.rfc}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{c.telefono}</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>{c.correo}</td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button onClick={() => { setForm(c); setEditandoId(c.id); }} style={btnEditar}>Editar</button>
                  <button onClick={() => eliminar(c.id)} style={btnEliminar}>Eliminar</button>
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
const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', flex: '1 1 200px', backgroundColor: '#ffffff', color: '#333333', fontSize: '14px' };
const btnStyle = (editing: number | null, color: string) => ({ padding: '12px 20px', background: editing ? '#f39c12' : color, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' });
const btnEditar = { padding: '6px 12px', marginRight: '8px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnEliminar = { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };