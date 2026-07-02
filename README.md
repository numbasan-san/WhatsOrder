# WhatsOrder

Sistema de automatización de pedidos por WhatsApp para grandes cadenas comerciales.

## Tecnologías

- Frontend + API: Next.js 15 (App Router)
- Base de datos: Supabase (PostgreSQL)
- Autenticación: Supabase Auth
- Mensajería: Telegram Bot API
- Estilos: Tailwind CSS
- Despliegue: Vercel

## Requisitos previos

- Node.js 18+
- npm o yarn
- Cuenta en Supabase (opcional para desarrollo offline)

## Configuración inicial

### 1. Clonar el repositorio

git clone https://github.com/equipo/whatsorder.git
cd whatsorder

### 2. Instalar dependencias

npm install

### 3. Configurar variables de entorno

Crea un archivo .env.local en la raíz del proyecto:

NEXT_PUBLIC_SUPABASE_URL=https://tusitio.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica
TELEGRAM_BOT_TOKEN=tu_token_de_telegram
NEXT_PUBLIC_USE_MOCK=true

### 4. Ejecutar en desarrollo

npm run dev

Abrir http://localhost:3000

## Modo offline (sin Supabase)

Si Supabase no está disponible o prefieres trabajar sin conexión:

1. En .env.local, establecer:
   NEXT_PUBLIC_USE_MOCK=true

2. El sistema usará datos de prueba locales (mock) para productos y pedidos.

3. El proxy de autenticación se saltará la verificación de sesión.

Para volver a usar Supabase real:
NEXT_PUBLIC_USE_MOCK=false

## Despliegue en Vercel

### 1. Instalar Vercel CLI

npm install -g vercel

### 2. Vincular y desplegar

vercel login
vercel link
vercel --prod

### 3. Variables de entorno en Vercel

Agregar en Settings -> Environment Variables:

- NEXT_PUBLIC_SUPABASE_URL: URL de tu proyecto Supabase
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: Clave pública de Supabase
- TELEGRAM_BOT_TOKEN: Token del bot de Telegram

## Integración con Telegram

### 1. Crear bot

- Buscar @BotFather en Telegram
- Enviar /newbot
- Elegir nombre y nombre de usuario (termina en bot)
- Guardar el token que te da BotFather

### 2. Configurar webhook

curl -F "url=https://tudominio.vercel.app/api/telegram/webhook" https://api.telegram.org/bot[TU_TOKEN]/setWebhook

### 3. Verificar webhook

https://api.telegram.org/bot[TU_TOKEN]/getWebhookInfo

## Estructura del proyecto

whatsorder/
├── app/
│   ├── api/telegram/webhook/route.ts    # Webhook de Telegram
│   ├── auth/                            # Autenticación (login, registro, etc.)
│   ├── protected/                       # Rutas protegidas (dashboard, etc.)
│   └── page.tsx                         # Página principal
├── lib/supabase/
│   ├── client.ts                        # Cliente de Supabase (mock o real)
│   ├── mock-client.ts                   # Datos de prueba para desarrollo offline
│   └── server.ts                        # Cliente para Server Components
├── proxy.ts                             # Middleware de autenticación
├── .env.local                           # Variables de entorno (no subir a git)
└── README.md

## Scripts disponibles

- npm run dev: Desarrollo con Turbopack
- npm run build: Compilar para producción
- npm start: Ejecutar en producción
- npm run lint: Revisar código con ESLint

## Licencia

Proyecto académico – Proyecto Integrador II
Equipo Aether Aegis