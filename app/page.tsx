'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  function addLog(message: string) {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }

  useEffect(() => {
    async function testConnection() {
      addLog('Iniciando prueba de conexión...');
      addLog(`URL de Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'NO DEFINIDA'}`);
      
      try {
        addLog('Ejecutando consulta a tabla products...');
        const { data, error, count } = await supabase
          .from('products')
          .select('*', { count: 'exact' });

        if (error) {
          addLog(`❌ ERROR: ${error.message} (${error.code})`);
          console.error('Error detallado:', error);
        } else {
          addLog(`✅ Éxito! Productos encontrados: ${data?.length || 0}`);
          addLog(`Muestra del primer producto: ${JSON.stringify(data?.[0] || 'ninguno')}`);
        }
      } catch (err: any) {
        addLog(`❌ EXCEPCIÓN: ${err.message}`);
        console.error(err);
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔧 Diagnóstico de Supabase</h1>
      <div style={{ 
        background: '#1e1e1e', 
        color: '#d4d4d4', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '0.25rem' }}>{log}</div>
        ))}
      </div>
    </div>
  );
}