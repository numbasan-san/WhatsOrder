# WhatsOrder

Sistema de automatizacion de pedidos por WhatsApp para grandes cadenas comerciales.

## Descripcion

WhatsOrder permite a retailers como Bravo, La Sirena o Jumbo activar un canal de delivery a domicilio via WhatsApp. Un agente de IA interpreta los mensajes de los clientes, consulta stock y precios contra el ERP, y genera borradores de pedido que los agentes de servicio al cliente (CSR) aprueban con un clic.

## Tecnologias

- Backend: FastAPI (Python)
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Cache / Colas: Redis
- IA: GPT API / Gemini API
- Autenticacion: JWT + bcrypt
- Contenedores: Docker
- Despliegue: Railway / Render

## Estructura del proyecto
whatsorder/
├── backend/ # FastAPI
├── frontend/ # React + Vite
├── database/ # Schema y seed
├── docs/ # Documentacion
└── docker-compose.yml # PostgreSQL + Redis


## Requisitos previos

- Python 3.10+
- Node.js 18+
- Docker y Docker Compose
- Git

## Instalacion y ejecucion

# WhatsOrder

Sistema de automatizacion de pedidos por WhatsApp para grandes cadenas comerciales.

## Descripcion

WhatsOrder permite a retailers como Bravo, La Sirena o Jumbo activar un canal de delivery a domicilio via WhatsApp. Un agente de IA interpreta los mensajes de los clientes, consulta stock y precios contra el ERP, y genera borradores de pedido que los agentes de servicio al cliente (CSR) aprueban con un clic.

## Tecnologias

- Backend: FastAPI (Python)
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Cache / Colas: Redis
- IA: GPT API / Gemini API
- Autenticacion: JWT + bcrypt
- Contenedores: Docker
- Despliegue: Railway / Render

## Estructura del proyecto

whatsorder/
├── backend/           # FastAPI
├── frontend/          # React + Vite
├── database/          # Schema y seed
├── docs/              # Documentacion
└── docker-compose.yml # PostgreSQL + Redis

## Requisitos previos

- Python 3.10+
- Node.js 18+
- Docker y Docker Compose
- Git

## Instalacion y ejecucion

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/whatsorder.git
cd whatsorder

### 2. Levantar base de datos y Redis con Docker

docker-compose up -d

### 3. Configurar variables de entorno

cd backend
cp .env.example .env
# Editar .env con tus credenciales

### 4. Instalar dependencias del backend

pip install -r requirements.txt

### 5. Crear las tablas en la base de datos

docker exec -i whatsorder_db psql -U whatsorder_user -d whatsorder_db < database/schema.sql

### 6. Ejecutar el backend

cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

### 7. Instalar dependencias del frontend

cd frontend
npm install

### 8. Ejecutar el frontend

npm run dev

## Endpoints principales

Metodo     | Endpoint                       | Descripcion
-----------|--------------------------------|-----------------------------
POST       | /api/v1/auth/login             | Iniciar sesion (JWT)
GET        | /api/v1/orders                 | Listar pedidos
GET        | /api/v1/orders/{id}            | Ver detalle de pedido
PUT        | /api/v1/orders/{id}/approve    | Aprobar pedido
PUT        | /api/v1/orders/{id}/reject     | Rechazar pedido
GET        | /api/v1/products               | Listar productos
GET        | /health                        | Estado del servicio

## Estado del desarrollo

Modulo                      | Estado
----------------------------|-----------------
Backend API                 | En desarrollo
Autenticacion JWT           | En desarrollo
Agente IA                   | En desarrollo
Dashboard React             | En desarrollo
Integracion WhatsApp        | Planificado
