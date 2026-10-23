// src/api/vinilos.js — todas las llamadas a la API de vinilos en un solo lugar
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const BASE_URL = `${API_URL}/api/vinilos`

const SIN_CONEXION = 'No se pudo conectar con la API. ¿Está encendido el servidor?'

// Todas las funciones devuelven SIEMPRE un objeto { datos, error } (nunca lanzan errores):
//   - si todo salió bien:  { datos: <respuesta de la API>, error: null }
//   - si algo falló:       { datos: null, error: { mensaje, status, detalles } }
async function pedir(ruta = '', opciones = {}) {
  const respuesta = await fetch(BASE_URL + ruta, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  }).catch(() => null) // fetch solo falla si no hay conexión con el servidor

  if (!respuesta) {
    return { datos: null, error: { mensaje: SIN_CONEXION, status: 0, detalles: [] } }
  }

  // Si la API está apagada, el proxy de Vite responde sin JSON
  const cuerpo = await respuesta.json().catch(() => null)

  if (!respuesta.ok) {
    const error = {
      mensaje: cuerpo?.error ?? SIN_CONEXION,
      status: respuesta.status,
      detalles: cuerpo?.detalles ?? [],
    }
    return { datos: null, error }
  }

  return { datos: cuerpo, error: null }
}

export const listarVinilos = () => pedir()

export const obtenerVinilo = (id) => pedir(`/${id}`)

export const crearVinilo = (vinilo) =>
  pedir('', { method: 'POST', body: JSON.stringify(vinilo) })

export const actualizarVinilo = (id, cambios) =>
  pedir(`/${id}`, { method: 'PUT', body: JSON.stringify(cambios) })

export const eliminarVinilo = (id) => pedir(`/${id}`, { method: 'DELETE' })
