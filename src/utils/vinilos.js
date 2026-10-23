// Los mismos géneros que acepta el esquema del backend (src/models/Vinilo.js)
export const GENEROS = {
  rock: 'Rock',
  pop: 'Pop',
  jazz: 'Jazz',
  salsa: 'Salsa',
  hiphop: 'Hip hop',
  electronica: 'Electrónica',
}

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export const formatearPrecio = (precio) => formatoPesos.format(precio)

export function textoStock(cantidad) {
  if (cantidad === 0) return 'Agotado'
  if (cantidad === 1) return 'Última unidad'
  return `${cantidad} disponibles`
}
