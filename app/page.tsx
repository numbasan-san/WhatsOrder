"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [productsCount, setProductsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        if (!error) {
          setIsConnected(true);
          setProductsCount(data?.length || 0);
        }
      } catch (err) {
        console.error('Error de conexión:', err);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛒 WhatsOrder</h1>
        <p style={styles.subtitle}>Sistema de automatización de pedidos por WhatsApp</p>

        <div style={styles.statusSection}>
          <h2 style={styles.sectionTitle}>Estado del sistema</h2>
          
          <div style={styles.statusItem}>
            <span style={styles.statusLabel}>📡 Supabase:</span>
            {loading ? (
              <span style={styles.statusPending}>Verificando...</span>
            ) : isConnected ? (
              <span style={styles.statusSuccess}>✅ Conectado</span>
            ) : (
              <span style={styles.statusError}>❌ Error de conexión</span>
            )}
          </div>

          {isConnected && productsCount !== null && (
            <div style={styles.statusItem}>
              <span style={styles.statusLabel}>📦 Productos:</span>
              <span style={styles.statusValue}>{productsCount} registrados</span>
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <a href="/dashboard" style={styles.button}>
            Ir al Dashboard →
          </a>
        </div>

        <p style={styles.footer}>
          Equipo Aether Aegis | Proyecto Integrador II
        </p>
      </div>
    </div>
  );
}

// Estilos (igual que antes)
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center' as const,
  },
  title: {
    color: '#2c3e50',
    marginBottom: '0.5rem',
    fontSize: '2rem',
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: '2rem',
    fontSize: '1rem',
  },
  statusSection: {
    textAlign: 'left' as const,
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#34495e',
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid #e9ecef',
  },
  statusLabel: {
    fontWeight: 'bold' as const,
    color: '#495057',
  },
  statusSuccess: {
    color: '#27ae60',
  },
  statusError: {
    color: '#e74c3c',
  },
  statusPending: {
    color: '#f39c12',
  },
  statusValue: {
    color: '#2c3e50',
  },
  actions: {
    marginTop: '1rem',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#25D366',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.75rem',
    color: '#adb5bd',
  },
} as const;