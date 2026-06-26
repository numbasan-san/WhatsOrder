import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// Opción A: Exportar función (para quienes usan createClient)
export function createClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey)
}

// Opción B: Exportar instancia directa (para quienes usan supabase)
export const supabase = createBrowserClient(supabaseUrl, supabasePublishableKey)