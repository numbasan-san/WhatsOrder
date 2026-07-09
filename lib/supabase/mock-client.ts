// Datos de prueba
const mockProducts = [
  { id: 1, name: 'Aceite vegetal 1L', price: 180, stock: 50, unit: 'unidad' },
  { id: 2, name: 'Arroz premium 5lb', price: 220, stock: 100, unit: 'bolsa' },
  { id: 3, name: 'Leche entera 1L', price: 65, stock: 30, unit: 'unidad' },
  { id: 4, name: 'Huevos (30 unidades)', price: 210, stock: 20, unit: 'cartón' },
  { id: 5, name: 'Azúcar blanca 2lb', price: 85, stock: 60, unit: 'bolsa' },
  { id: 6, name: 'Café molido 500g', price: 320, stock: 25, unit: 'paquete' },
  { id: 7, name: 'Jabón líquido', price: 95, stock: 40, unit: 'unidad' },
  { id: 8, name: 'Pollo entero 2kg', price: 380, stock: 15, unit: 'unidad' },
  { id: 9, name: 'Pan de molde', price: 120, stock: 35, unit: 'unidad' },
  { id: 10, name: 'Agua embotellada 6L', price: 130, stock: 80, unit: 'paquete' },
];

const mockOrders = [
  {
    id: 1,
    customer_name: 'María Rodríguez',
    customer_phone: '809-555-1234',
    status: 'pending',
    total: 580.00,
    items: [
      { product: 'Aceite vegetal 1L', quantity: 2, subtotal: 360.00 },
      { product: 'Arroz premium 5lb', quantity: 1, subtotal: 220.00 }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    customer_name: 'Juan Pérez',
    customer_phone: '809-555-5678',
    status: 'approved',
    total: 415.00,
    items: [
      { product: 'Arroz premium 5lb', quantity: 1, subtotal: 220.00 },
      { product: 'Leche entera 1L', quantity: 3, subtotal: 195.00 }
    ],
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 3,
    customer_name: 'Ana Martínez',
    customer_phone: '809-555-9012',
    status: 'pending',
    total: 640.00,
    items: [
      { product: 'Café molido 500g', quantity: 2, subtotal: 640.00 }
    ],
    created_at: new Date(Date.now() - 7200000).toISOString()
  }
];

// Mock de la función 'from' de Supabase
export function createMockClient() {
  return {
    auth: {
      getSession: async () => ({
        data: { session: { user: { id: 'mock-user-id', email: 'test@test.com' } } },
        error: null
      }),
      getUser: async () => ({
        data: { user: { id: 'mock-user-id', email: 'test@test.com' } },
        error: null
      }),
      resetPasswordForEmail: async (email: string, options?: any) => {
        console.log(`🔐 Mock: resetPasswordForEmail para ${email}`);
        console.log(`🔐 Mock: redirectTo ${options?.redirectTo || 'no redirect'}`);
        return { data: null, error: null };
      },
      updateUser: async (data: any) => {
        console.log(`🔐 Mock: updateUser`, data);
        return { data: { user: { id: 'mock-user-id', email: 'test@test.com' } }, error: null };
      }
    },
    from: (table: string) => {
      if (table === 'products') {
        return {
          select: (query?: string) => ({
            data: mockProducts,
            error: null,
            count: mockProducts.length
          }),
          insert: (data: any) => ({
            data: { ...data, id: mockProducts.length + 1 },
            error: null
          }),
          update: (data: any) => ({
            eq: (field: string, value: any) => ({
              data: { ...data },
              error: null
            })
          }),
          delete: () => ({
            eq: (field: string, value: any) => ({
              data: null,
              error: null
            })
          })
        };
      }
      
      if (table === 'orders') {
        return {
          select: (query?: string) => ({
            data: mockOrders,
            error: null,
            count: mockOrders.length
          }),
          insert: (data: any) => ({
            data: { ...data, id: mockOrders.length + 1, created_at: new Date().toISOString() },
            error: null
          }),
          update: (data: any) => ({
            eq: (field: string, value: any) => ({
              data: { ...data },
              error: null
            })
          })
        };
      }
      
      // Para otras tablas
      return {
        select: () => ({ data: [], error: null }),
        insert: (data: any) => ({ data, error: null }),
        update: (data: any) => ({ eq: () => ({ data, error: null }) })
      };
    }
  };
}