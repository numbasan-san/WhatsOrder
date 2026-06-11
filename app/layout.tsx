import './globals.css'

export const metadata = {
  title: 'WhatsOrder',
  description: 'Sistema de automatización de pedidos por WhatsApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
