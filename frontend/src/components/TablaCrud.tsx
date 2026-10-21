interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}

export default function TablaCrud({ columns, data, onEdit, onDelete }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
      <thead style={{ background: '#2980b9', color: 'white' }}>
        <tr>
          {columns.map(col => <th key={col.key} style={{ padding: '15px', textAlign: 'left' }}>{col.label}</th>)}
          <th style={{ padding: '15px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? <tr><td colSpan={columns.length + 1} style={{ padding: '20px', textAlign: 'center' }}>No hay registros</td></tr> : 
          data.map((item, index) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
            {columns.map(col => <td key={col.key} style={{ padding: '12px' }}>{item[col.key]}</td>)}
            <td style={{ padding: '12px' }}>
              <button onClick={() => onEdit(item)} style={{ padding: '6px 12px', marginRight: '8px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
              <button onClick={() => onDelete(item.id)} style={{ padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}