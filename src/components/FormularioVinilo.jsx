import { useState } from 'react'
import { GENEROS } from '../utils/vinilos.js'

const VACIO = { nombre: '', autor: '', genero: '', precio: '', cantidadDisponible: '0' }

// Los inputs trabajan con texto; antes de enviar se convierten los números
function aValoresIniciales(vinilo) {
  if (!vinilo) return VACIO
  return {
    nombre: vinilo.nombre,
    autor: vinilo.autor,
    genero: vinilo.genero,
    precio: String(vinilo.precio),
    cantidadDisponible: String(vinilo.cantidadDisponible ?? 0),
  }
}

// Sirve para crear y para editar: quien lo usa decide qué hacer en onGuardar.
// onGuardar debe devolver el error de la API (o null si todo salió bien).
export default function FormularioVinilo({ vinilo, textoBoton, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(() => aValoresIniciales(vinilo))
  const [errores, setErrores] = useState([])
  const [enviando, setEnviando] = useState(false)

  function cambiar(evento) {
    const { name, value } = evento.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    setEnviando(true)
    setErrores([])

    const error = await onGuardar({
      nombre: valores.nombre.trim(),
      autor: valores.autor.trim(),
      genero: valores.genero,
      precio: Number(valores.precio),
      cantidadDisponible: Number(valores.cantidadDisponible || 0),
    })

    if (error) {
      // Si el backend rechaza los datos, muestra cada motivo que envió
      setErrores(error.detalles.length ? error.detalles : [error.mensaje])
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      {errores.length > 0 && (
        <div className="estado estado--error" role="alert">
          <p className="estado__titulo">No se pudo guardar el vinilo</p>
          <ul>
            {errores.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <label className="campo">
        <span>Nombre del álbum</span>
        <input name="nombre" value={valores.nombre} onChange={cambiar} required autoFocus />
      </label>

      <label className="campo">
        <span>Autor</span>
        <input name="autor" value={valores.autor} onChange={cambiar} required />
      </label>

      <label className="campo">
        <span>Género</span>
        <select name="genero" value={valores.genero} onChange={cambiar} required>
          <option value="" disabled>
            Elige un género
          </option>
          {Object.entries(GENEROS).map(([valor, nombre]) => (
            <option key={valor} value={valor}>
              {nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="formulario__fila">
        <label className="campo">
          <span>Precio (COP)</span>
          <input name="precio" type="number" min="0" step="1" value={valores.precio} onChange={cambiar} required />
        </label>

        <label className="campo">
          <span>Cantidad disponible</span>
          <input
            name="cantidadDisponible"
            type="number"
            min="0"
            step="1"
            value={valores.cantidadDisponible}
            onChange={cambiar}
          />
        </label>
      </div>

      <div className="acciones">
        <button type="submit" className="boton boton--primario" disabled={enviando}>
          {enviando ? 'Guardando…' : textoBoton}
        </button>
        <button type="button" className="boton" onClick={onCancelar} disabled={enviando}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
