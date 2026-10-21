import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Usuarios() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ usuario: '', password: '', rol: 'vendedor' });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const cargar = async () => { 
    try { 
      const res = await axios.get('/api/usuarios'); 
      console.log("Respuesta del servidor (GET):", res.data); 
      // Aseguramos que siempre sea un arreglo
      setData(Array.isArray(res.data.data) ? res.data.data : []); 
    } catch (error: any) { 
      console.error("Error al cargar:", error.response?.data || error.message); 
    }
  };
  
  useEffect(() => { cargar(); }, []);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`/api/usuarios/${editandoId}`, form);
      } else {
        await axios.post('/api/usuarios', form);
      }
      alert('Guardado con éxito');
      setForm({ usuario: '', password: '', rol: 'vendedor' }); 
      setEditandoId(null); 
      cargar();
    } catch (error: any) { 
      // ESTO ES CLAVE: Imprime el error exacto del backend en la consola (F12)
      console.error("Error al guardar:", error.response?.data || error.message); 
      alert(`Error al guardar: ${error.response?.data?.message || 'Revisa la consola (F12)'}`);
    }
  };

  const eliminar = async (id: number) => { 
    if(window.confirm('¿Eliminar usuario?')) { 
      try {
        await axios.delete(`/api/usuarios/${id}`); 
        cargar(); 
      } catch (error) {
        console.error(error);
      }
    } 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#8e44ad', textAlign: 'center' }}>Gestión de Usuarios</h1>
      
      <form onSubmit={guardar} style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto 20px auto' }}>
        
        <input placeholder="Nombre de Usuario" value={form.usuario} onChange={e => setForm({...form, usuario: e.target.value})} required style={inputStyle} />
        
        <input type="password" placeholder="Contraseña" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={inputStyle} />
        
        <select value={form.rol} onChange={e => setForm({...form, rol: e.target.value})} style={inputStyle}>
          {/* OJO: El valor debe ser igual a como lo guardas en la BD. Si en la BD es "administrador", ponlo así. */}
          <option value="admin">Administrador</option>
          <option value="vendedor">Vendedor</option>
          <option value="almacenista">Almacenista</option>
        </select>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: 1, padding: '12px', background: editandoId ? '#f39c12' : '#8e44ad', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editandoId ? 'Actualizar' : 'Guardar'}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setEditandoId(null); setForm({ usuario: '', password: '', rol: 'vendedor' }); }} style={{ padding: '12px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#8e44ad', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>Usuario</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Rol</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No hay usuarios registrados</td></tr>
            ) : (
              data.map((u: any, index) => (
                <tr key={u.id || index} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#fdfbfe' }}>
                  <td style={{ padding: '12px 15px', color: '#333' }}>{u.usuario || 'Sin nombre'}</td>
                  <td style={{ padding: '12px 15px', color: '#333', textTransform: 'capitalize' }}>{u.rol || 'Sin rol'}</td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <button onClick={() => { setForm({ ...u, password: '' }); setEditandoId(u.id); }} style={btnEditar}>Editar</button>
                    <button onClick={() => eliminar(u.id)} style={btnEliminar}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#ffffff', color: '#333333', fontSize: '14px', width: '100%', boxSizing: 'border-box' as const };
const btnEditar = { padding: '6px 12px', marginRight: '8px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnEliminar = { padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };