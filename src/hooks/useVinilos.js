import { useCallback, useEffect, useState } from 'react'
import { listarVinilos, obtenerVinilo } from '../api/vinilos.js'

// Ejecuta una petición al montar el componente y guarda datos, error y estado de carga
function useCarga(cargar) {
  const [intento, setIntento] = useState(0)
  // Cada resultado recuerda de qué petición viene (cargar + intento)
  const [resultado, setResultado] = useState({ cargar: null, intento: -1, datos: null, error: null })

  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya se desmontó
    cargar().then(({ datos, error }) => {
      if (activo) setResultado({ cargar, intento, datos, error })
    })

    return () => {
      activo = false
    }
  }, [cargar, intento])

  // Está cargando mientras el último resultado no corresponda a la petición actual
  const cargando = resultado.cargar !== cargar || resultado.intento !== intento
  const recargar = useCallback(() => setIntento((n) => n + 1), [])

  return { datos: resultado.datos, error: cargando ? null : resultado.error, cargando, recargar }
}

export const useVinilos = () => useCarga(listarVinilos)

export function useVinilo(id) {
  const cargar = useCallback(() => obtenerVinilo(id), [id])
  return useCarga(cargar)
}
