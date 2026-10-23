# Tienda de vinilos — Frontend

Frontend en React + Vite que consume la API `vinilos-api` (Express + MongoDB).

## Qué hace

- **Catálogo** (`/`): lista los vinilos con búsqueda por nombre o autor, filtro por género y orden por nombre o precio, más un resumen del inventario.
- **Detalle** (`/vinilos/:id`): muestra toda la información del vinilo y permite eliminarlo.
- **Crear** (`/vinilos/nuevo`) y **editar** (`/vinilos/:id/editar`): un formulario que muestra los errores de validación que devuelve el backend.

## Cómo ejecutarlo

1. Enciende la API (en la carpeta `vinilos-api`):

   ```bash
   npm run dev
   ```

2. Enciende el frontend (en esta carpeta):

   ```bash
   pnpm install
   pnpm dev
   ```

3. Abre http://localhost:5173

En desarrollo, Vite reenvía todo lo que empieza por `/api` a `http://localhost:3000` (ver `vite.config.js`).

## Producción

Copia `.env.example` como `.env` y pon la URL del backend desplegado:

```
VITE_API_URL=https://tu-api.vercel.app
```

El backend ya tiene CORS habilitado. Si quieres que solo tu frontend pueda llamarlo, define `CORS_ORIGIN` en el backend (por ejemplo, `CORS_ORIGIN=https://tu-front.vercel.app`).

## Estructura

```
src/
  api/vinilos.js        llamadas fetch a la API (listar, obtener, crear, actualizar, eliminar)
  hooks/useVinilos.js   hooks para cargar datos con estados de carga y error
  utils/vinilos.js      géneros, formato de precio y texto del stock
  components/           Layout, Disco, TarjetaVinilo, FormularioVinilo, Estado
  pages/                ListaVinilos, DetalleVinilo, NuevoVinilo, EditarVinilo, NoEncontrado
```
