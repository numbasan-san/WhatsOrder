import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

// Definir el tipo de producto
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
};

export default function TestPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data } = await supabase.from('products').select('*');
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}