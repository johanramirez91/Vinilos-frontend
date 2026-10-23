import { useLocation, useSearchParams } from 'react-router'
import { Cargando, MensajeError } from '../components/Estado.jsx'
import TarjetaVinilo from '../components/TarjetaVinilo.jsx'
import { useVinilos } from '../hooks/useVinilos.js'
import { GENEROS } from '../utils/vinilos.js'

const ORDENES = {
  nombre: { texto: 'Nombre (A-Z)', comparar: (a, b) => a.nombre.localeCompare(b.nombre) },
  'precio-asc': { texto: 'Precio: menor a mayor', comparar: (a, b) => a.precio - b.precio },
  'precio-desc': { texto: 'Precio: mayor a menor', comparar: (a, b) => b.precio - a.precio },
}

export default function ListaVinilos() {
  const { datos: vinilos, error, cargando, recargar } = useVinilos()
  const location = useLocation()

  // Los filtros viven en la URL (?q=...&genero=...) para no perderlos al volver atrás
  const [filtros, setFiltros] = useSearchParams()
  const busqueda = filtros.get('q') ?? ''
  const genero = filtros.get('genero') ?? ''
  const orden = ORDENES[filtros.get('orden')] ? filtros.get('orden') : 'nombre'

  function cambiarFiltro(nombre, valor) {
    setFiltros(
      (anteriores) => {
        if (valor) anteriores.set(nombre, valor)
        else anteriores.delete(nombre)
        return anteriores
      },
      { replace: true },
    )
  }

  if (cargando && !vinilos) return <Cargando texto="Cargando vinilos…" />
  if (error) return <MensajeError error={error} onReintentar={recargar} />

  const texto = busqueda.trim().toLowerCase()
  const visibles = vinilos
    .filter((v) => !genero || v.genero === genero)
    .filter((v) => !texto || `${v.nombre} ${v.autor}`.toLowerCase().includes(texto))
    .toSorted(ORDENES[orden].comparar)

  const unidades = vinilos.reduce((total, v) => total + v.cantidadDisponible, 0)
  const agotados = vinilos.filter((v) => v.cantidadDisponible === 0).length

  return (
    <>
      {location.state?.mensaje && <p className="aviso">{location.state.mensaje}</p>}

      <section className="resumen" aria-label="Resumen del inventario">
        <div>
          <strong>{vinilos.length}</strong>
          <span>títulos</span>
        </div>
        <div>
          <strong>{unidades}</strong>
          <span>unidades en stock</span>
        </div>
        <div>
          <strong>{agotados}</strong>
          <span>agotados</span>
        </div>
      </section>

      <section className="filtros" aria-label="Filtros">
        <input
          type="search"
          placeholder="Buscar por nombre o autor…"
          value={busqueda}
          onChange={(e) => cambiarFiltro('q', e.target.value)}
          aria-label="Buscar"
        />
        <select value={orden} onChange={(e) => cambiarFiltro('orden', e.target.value)} aria-label="Ordenar">
          {Object.entries(ORDENES).map(([valor, { texto }]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
        <div className="chips" role="group" aria-label="Filtrar por género">
          <button
            type="button"
            className={`chip ${genero === '' ? 'chip--activo' : ''}`}
            onClick={() => cambiarFiltro('genero', '')}
          >
            Todos
          </button>
          {Object.entries(GENEROS).map(([valor, nombre]) => (
            <button
              key={valor}
              type="button"
              className={`chip ${genero === valor ? 'chip--activo' : ''}`}
              onClick={() => cambiarFiltro('genero', valor)}
            >
              {nombre}
            </button>
          ))}
        </div>
      </section>

      {visibles.length === 0 ? (
        <p className="vacio">
          {vinilos.length === 0 ? 'Todavía no hay vinilos. ¡Agrega el primero!' : 'Ningún vinilo coincide con los filtros.'}
        </p>
      ) : (
        <section className="rejilla">
          {visibles.map((vinilo) => (
            <TarjetaVinilo key={vinilo._id} vinilo={vinilo} />
          ))}
        </section>
      )}
    </>
  )
}
