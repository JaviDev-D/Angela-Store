# Angela Store

Tienda de ropa en línea. Proyecto desarrollado para la evidencia
**GA8-220501096-AA1-EV01** — "Desarrollar software a partir de la
integración de sus módulos componentes".

## Arquitectura

```
AngelaStore/
├── angela_store.sql          # Script de base de datos
├── backend/                  # API REST (Node.js + Express + MySQL)
│   ├── server.js             # Punto de entrada
│   └── src/
│       ├── app.js            # Ensamblado de la aplicación (seguridad, rutas)
│       ├── config/db.js      # Conexión a MySQL (pool, variables de entorno)
│       ├── controllers/      # Capa HTTP (request/response)
│       ├── services/         # Capa de negocio (validaciones, reglas)
│       ├── repositories/     # Capa de acceso a datos (SQL)
│       ├── routes/           # Definición de endpoints
│       └── middlewares/      # Manejo de errores
│   └── tests/                # Pruebas unitarias e integración (Jest)
└── frontend/                 # Catálogo web (HTML, CSS, JS puro)
```

## Instalación

### 1. Base de datos

```bash
mysql -u root -p < angela_store.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env      # ajusta tus credenciales de MySQL
npm install
npm run dev                # http://localhost:3000
```

### 3. Pruebas unitarias

```bash
cd backend
npm test
```

### 4. Frontend

Abre `frontend/index.html` con Live Server (o cualquier servidor
estático). Asegúrate de que `API_URL` en `script.js` apunte al
backend (por defecto `http://localhost:3000/api/productos`).

## Endpoints de la API

| Método | Ruta                | Descripción              |
|--------|---------------------|---------------------------|
| GET    | /api/productos      | Lista todos los productos |
| GET    | /api/productos/:id  | Obtiene un producto       |
| POST   | /api/productos      | Crea un producto          |
| PUT    | /api/productos/:id  | Actualiza un producto     |
| DELETE | /api/productos/:id  | Elimina un producto       |

## Repositorio

https://github.com/JaviDev-D/Angela-Store
