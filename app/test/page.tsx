'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PublicTest() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data } = await supabase.from('products').select('*')
      setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      <h1>Productos (público)</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}