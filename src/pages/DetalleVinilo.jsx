import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { eliminarVinilo } from '../api/vinilos.js'
import Disco from '../components/Disco.jsx'
import { Cargando, MensajeError } from '../components/Estado.jsx'
import { useVinilo } from '../hooks/useVinilos.js'
import { formatearPrecio, GENEROS, textoStock } from '../utils/vinilos.js'

export default function DetalleVinilo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { datos: vinilo, error, cargando, recargar } = useVinilo(id)
  const [errorEliminar, setErrorEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)

  async function eliminar() {
    if (!window.confirm(`¿Seguro que quieres eliminar "${vinilo.nombre}"?`)) return
    setEliminando(true)
    const { error } = await eliminarVinilo(id)

    if (error) {
      setErrorEliminar(error)
      setEliminando(false)
      return
    }
    navigate('/', { state: { mensaje: `"${vinilo.nombre}" se eliminó del catálogo.` } })
  }

  if (cargando) return <Cargando texto="Cargando vinilo…" />
  if (error) {
    return (
      <MensajeError error={error} onReintentar={error.status === 0 || error.status >= 500 ? recargar : undefined}>
        <Link to="/" className="boton">
          Volver al catálogo
        </Link>
      </MensajeError>
    )
  }

  return (
    <article className="detalle">
      <Link to="/" className="volver">
        ← Volver al catálogo
      </Link>

      <div className="detalle__contenido">
        <Disco genero={vinilo.genero} tamano="grande" />

        <div className="detalle__info">
          <span className={`etiqueta-genero etiqueta-genero--${vinilo.genero}`}>{GENEROS[vinilo.genero]}</span>
          <h1>{vinilo.nombre}</h1>
          <p className="detalle__autor">{vinilo.autor}</p>

          <dl className="detalle__datos">
            <div>
              <dt>Precio</dt>
              <dd>{formatearPrecio(vinilo.precio)}</dd>
            </div>
            <div>
              <dt>Inventario</dt>
              <dd className={vinilo.cantidadDisponible === 0 ? 'stock--agotado' : ''}>
                {textoStock(vinilo.cantidadDisponible)}
              </dd>
            </div>
            <div>
              <dt>Id</dt>
              <dd className="detalle__id">{vinilo._id}</dd>
            </div>
          </dl>

          {errorEliminar && <MensajeError error={errorEliminar} />}

          <div className="acciones">
            <Link to={`/vinilos/${id}/editar`} className="boton boton--primario">
              Editar
            </Link>
            <button type="button" className="boton boton--peligro" onClick={eliminar} disabled={eliminando}>
              {eliminando ? 'Eliminando…' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
