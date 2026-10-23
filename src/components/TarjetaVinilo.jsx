import { Link } from 'react-router'
import { formatearPrecio, GENEROS, textoStock } from '../utils/vinilos.js'
import Disco from './Disco.jsx'

export default function TarjetaVinilo({ vinilo }) {
  const agotado = vinilo.cantidadDisponible === 0

  return (
    <Link to={`/vinilos/${vinilo._id}`} className={`tarjeta ${agotado ? 'tarjeta--agotada' : ''}`}>
      <Disco genero={vinilo.genero} />
      <div className="tarjeta__info">
        <span className={`etiqueta-genero etiqueta-genero--${vinilo.genero}`}>{GENEROS[vinilo.genero]}</span>
        <h2 className="tarjeta__nombre">{vinilo.nombre}</h2>
        <p className="tarjeta__autor">{vinilo.autor}</p>
        <div className="tarjeta__pie">
          <strong>{formatearPrecio(vinilo.precio)}</strong>
          <span className={`stock ${agotado ? 'stock--agotado' : ''}`}>{textoStock(vinilo.cantidadDisponible)}</span>
        </div>
      </div>
    </Link>
  )
}
