import { createBrowserClient } from '@supabase/ssr';
import { createMockClient } from './mock-client';

// Flag para usar mock o real
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true; // ← Cambiar a 'false' cuando Supabase vuelva

export function createClient() {
  if (USE_MOCK) {
    console.log('🔧 Usando cliente mock de Supabase');
    return createMockClient();
  }
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  
  return createBrowserClient(supabaseUrl, supabaseKey);
}