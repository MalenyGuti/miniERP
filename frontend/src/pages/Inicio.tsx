import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Inicio() {
  const [stats, setStats] = useState({
    productos: 0,
    clientes: 0,
    proveedores: 0,
    ventas: 0
  });

  const cargarEstadisticas = async () => {
    try {
      // Hacemos las 4 peticiones al mismo tiempo para que cargue rápido
      const [resProd, resCli, resProv, resVentas] = await Promise.all([
        axios.get('/api/productos').catch(() => ({ data: { data: [] } })),
        axios.get('/api/clientes').catch(() => ({ data: { data: [] } })),
        axios.get('/api/proveedores').catch(() => ({ data: { data: [] } })),
        axios.get('/api/ventas').catch(() => ({ data: { data: [] } }))
      ]);

      setStats({
        productos: resProd.data.data.length,
        clientes: resCli.data.data.length,
        proveedores: resProv.data.data.length,
        ventas: resVentas.data.data.length
      });
    } catch (error) {
      console.error("Error al cargar estadísticas", error);
    }
  };

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* BIENVENIDA */}
      <div style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', color: 'white', padding: '30px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>¡Bienvenida a tu Mini ERP!</h1>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          Aquí tienes un resumen en tiempo real de la información registrada en tu sistema.
        </p>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        {/* Tarjeta Productos */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #27ae60' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Productos</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#2c3e50' }}>{stats.productos}</h3>
            </div>
            <span style={{ fontSize: '40px' }}>📦</span>
          </div>
        </div>

        {/* Tarjeta Clientes */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #2980b9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Clientes</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#2c3e50' }}>{stats.clientes}</h3>
            </div>
            <span style={{ fontSize: '40px' }}>👥</span>
          </div>
        </div>

        {/* Tarjeta Proveedores */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #e67e22' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Proveedores</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#2c3e50' }}>{stats.proveedores}</h3>
            </div>
            <span style={{ fontSize: '40px' }}>🚚</span>
          </div>
        </div>

        {/* Tarjeta Ventas */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #8e44ad' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>Ventas</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#2c3e50' }}>{stats.ventas}</h3>
            </div>
            <span style={{ fontSize: '40px' }}>💰</span>
          </div>
        </div>

      </div>

      {/* SECCIÓN DE AYUDA O TIPS */}
      <div style={{ marginTop: '40px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#2c3e50', marginTop: 0 }}>💡 Acciones Rápidas</h3>
        <p style={{ color: '#7f8c8d' }}>Utiliza el menú de la izquierda para navegar por los diferentes módulos de tu sistema.</p>
        <ul style={{ color: '#34495e', lineHeight: '1.8' }}>
          <li>Recuerda que al hacer una <strong>Venta</strong>, el stock de tus productos bajará automáticamente.</li>
          <li>Al registrar una <strong>Compra</strong>, el stock de tus productos aumentará.</li>
        </ul>
      </div>

    </div>
  );
}