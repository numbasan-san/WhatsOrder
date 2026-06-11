// app/not-found.tsx
import Link from 'next/link';

// Este componente NO debe usar 'use client' si contiene lógica de auth
// O si lo usa, que no llame a supabase ni a useSession
export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Página no encontrada</p>
        <Link href="/" style={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    textAlign: 'center' as const,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '6rem',
    margin: 0,
    color: '#25D366',
  },
  message: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '2rem',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#25D366',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
  },
};